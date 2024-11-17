const { validationError, errorHandle } = require('@/lib')
const { Review } = require('@/models')


class ReviewsCtrl {
    show = async (req, res, next) => {
        try {
            let reviews=await Review.aggregate()
            .lookup({from:'products',localField:'productId',foreignField:'_id',as:'product'})
            .lookup({from:'users',localField:'userId',foreignField:'_id',as:'user'})
        for(let i in reviews){
            reviews[i].product=reviews[i].product[0]
            reviews[i].user=reviews[i].user[0]
        }
            res.send(reviews)
        } catch (err) {
            return errorHandle(err, next)

        }
    }

    delete = async (req, res, next) => {
        try {
            let review = await Review.findById(req.params.id)
            if (review) {
                let review = await Review.findByIdAndDelete(req.params.id)
                res.send({
                    message: review.name+ " Review deleted successfully"
                }
                )
            } else {
                next,
                res.send("Reviews not found")
            }
        } catch (err) {
            errorHandle(err, next)

        }
    }

   
    update = async (req, res, next) => {
        try {
            const review=await Review.findById(req.params.id)
            if(review){
                const {name,status}=req.body
                await Review.findByIdAndUpdate(req.params.id,{name,status})
                res.send({
                    message: req.body.name+" Review updated successfully"
                })
            }else{
                return next({
                    message: req.body.name+ ' Review Not created',
                    status:404
                })
            }
            
        } catch (err) {
            errorHandle(err,next)
            
        }
    }

    


}


module.exports = new ReviewsCtrl