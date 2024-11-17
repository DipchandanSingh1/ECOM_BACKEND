const { validationError, errorHandle } = require('@/lib')
const { Category } = require('@/models')


class categoryCtrl {
    show = async (req, res, next) => {
        try {
            let category = await Category.find()
            res.send(category)
        } catch (err) {

        }
    }
    showById = async(req, res, next) => {
        try {
            console.log(req.params.id)
            let category = await Category.findById(req.params.id)

            if(category){
                res.send(category)
            }else{next,
                {message:"Category not found"}
                
            }


        } catch (err) {
            errorHandle(err, next)

        }



    }
    delete = async (req, res, next) => {
        try {
            let category = await Category.findById(req.params.id)
            if (category) {
                let category = await Category.findByIdAndDelete(req.params.id)
                res.send({
                    message: "Category deleted successfully"
                }
                )
            } else {
                next,
                res.send("Category not found")
            }
        } catch (err) {
            errorHandle(err, next)

        }
    }

    create = async (req, res, next) => {
        try {
            let { name, status } = req.body
            if (name && status) {
                await Category.create({ name, status })
                res.status(201)
                res.json({
                    message: "Category added sucessfully"
                })
            } else {
                return validationError(next, {
                    Category: "Category not created.Try again"
                })
            }


        } catch (error) {
            return errorHandle(error, next)
        }
    }
    update = async (req, res, next) => {
        try {
            const category=await Category.findById(req.params.id)
            if(category){
                const {name,status}=req.body
                await Category.findByIdAndUpdate(req.params.id,{name,status})
                res.send({
                    message:"Category updated successfully"
                })
            }else{
                return next({
                    message:'Category not found',
                    status:404
                })
            }
            
        } catch (err) {
            errorHandle(err,next)
            
        }
    }
}





module.exports = new categoryCtrl