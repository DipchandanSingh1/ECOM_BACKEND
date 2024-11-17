const { validationError, errorHandle, notFoundError } = require('@/lib')
const { Order, OrderDetail } = require('@/models')



class OrdersCtrl {
    index = async (req, res, next) => {
        try {
            let orders=await Order.aggregate()
            .lookup({from:'users',localField:'userId',foreignField:'_id',as:'user'})
           
        for(let i in orders){
            orders[i].user=orders[i].user[0]
            orders[i].details=await OrderDetail.aggregate()
                .match({orderId:orders[i]._id})
                .lookup({from:'products',localField:'productId',foreignField:'_id',as:'product'})
                
            for(let j in orders[i].details){
                orders[i].details[j].product=orders[i].details[j].product[0]

            }
        }
        res.send(orders)
        } catch (err) {
            return errorHandle(err, next)

        }
    }
    
    delete = async (req, res, next) => {
        try {
            let orders = await Order.findById(req.params.id)
            if (orders) {
                const details=await OrderDetail.deleteMany({orderid:orders._id})

                await Order.findByIdAndDelete(req.params.id)
                res.send({
                    message:  " Order deleted successfully"
                }
                )
            } else {
                return notFoundError('Orders',next)
            }
        } catch (err) {
            errorHandle(err, next)

        }
    }

    
    update = async (req, res, next) => {
        console.log(req.body)
        console.log(req.params.id)
        try {
            const orders=await Order.findById(req.params.id)
            if(orders){
                await Order.findByIdAndUpdate(req.params.id,{status: req.body.status})
                res.send({
                    message:" Order updated successfully"
                })
            }else{
                    return notFoundError('Orders',next)
                }
            }
            
           catch (err) {
            return errorHandle(err,next)
            
        }
    }

    


}


module.exports = new OrdersCtrl