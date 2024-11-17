const { errorHandle, validationError } = require("@/lib")
const { User, Review, Order, OrderDetail } = require("@/models")
const bcrypt = require('bcryptjs')
const { Types } = require("mongoose")
class ProfileCtrl {
    show = (req, res, next) => {
        try {

            res.send(req.user)

        } catch (err) {

        }
    }
    update = async (req, res, next) => {
        try {
            console.log(req.body)
            let { name, phone, address } = req.body
            await User.findByIdAndUpdate(req.uid, { name, phone, address })
            res.send({
                message: "Profile updated successfully"
            })

        } catch (err) {
            errorHandle(err, next)

        }
    }
    updatePassword = async (req, res, next) => {
        try {
            let { oldPassword, newPassword, confirmPassword } = req.body
            const user = await User.findById(req.uid).select('+password')
            if (bcrypt.compareSync(oldPassword, user.password)) {
                if (newPassword == confirmPassword) {
                    const hash = bcrypt.hashSync(newPassword)
                    await User.findByIdAndUpdate(req.uid, { password: hash })

                    res.send({
                        message: "password updated successfully"
                    })
                } else {
                    return validationError(next, {
                        newPassword: "Password not matched with confirm password"
                    })

                }

            } else {
                return validationError(next, {
                    oldPassword: "Old password is incorrect"
                })
            }

        } catch (err) {
            return errorHandle(err, next)

        }

    }

    reviews = async (req, res, next) => {
        try {
            let reviews = await Review.aggregate()
                .match({ userId: new Types.ObjectId(req.uid) })
                .lookup({ from: 'products', localField: 'productId', foreignField: '_id', as: 'product' })
                .lookup({from:'users',localField:'userId',foreignField:'_id',as:'user'})

            for (let i in reviews) {
                reviews[i].user = reviews[i].user[0]
            }
            res.send(reviews)

        } catch (err) {
            return errorHandle(err, next)

        }
    }
    orders = async (req, res, next) => {
        console.log(req.body)
        try {
            let orders = await Order.aggregate()
                .match({ userId: new Types.ObjectId(req.uid) })
                console.log("profile orders"+orders)
            for (let i in orders) {
                orders[i].details = await OrderDetail.aggregate()
                    .match({ orderId: orders[i]._id })
                    .lookup({ from: 'products', localField: 'productId', foreignField: '_id', as: 'product' })
                
                for (let j in orders[i].details) {
                    orders[i].details[j].product = orders[i].details[j].product[0]
                }
                console.log(orders[i].details)
                
            }
            res.send(orders)

        } catch (err) {
            return errorHandle(err, next)

        }

    }



}

module.exports = new ProfileCtrl