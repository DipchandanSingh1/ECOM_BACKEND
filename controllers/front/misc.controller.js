const { errorHandle } = require("@/lib")
const { Category, Product, Brand, Order, OrderDetail } = require("@/models")

class miscCtrl {
    categories = async (req, res, next) => {
        try {
            const categories = await Category.find({ status: true })
            res.send(categories)
        } catch (err) {
            errorHandle(err, next)
        }
    }
    categoryById = async (req, res, next) => {
        try {
            const category = await Category.findOne({ status: true, _id: req.params.id })
            res.send(category)
        } catch (err) {
            errorHandle(err, next)
        }
    }
    categoryProducts = async (req, res, next) => {
        try {
            const products = await Product.find({ status: true, categoryId: req.params.id })
            res.send(products)
        } catch (err) {
            errorHandle(err, next)
        }
    }
    brands = async (req, res, next) => {
        try {
            try {
                const brands = await Brand.find({ status: true })
                res.send(brands)
            } catch (err) {
                errorHandle(err, next)
            }

        } catch (err) {
            errorHandle(err, next)
        }
    }
    brandById = async (req, res, next) => {
        try {
            const brand = await Brand.findOne({ status: true, _id: req.params.id })
            res.send(brand)
        } catch (err) {
            errorHandle(err, next)
        }
    }
    brandProducts = async (req, res, next) => {
        try {
            const products = await Product.find({ status: true, brandId: req.params.id })
            res.send(products)
        } catch (err) {
            errorHandle(err, next)
        }
    }
    checkout = async (req, res, next) => {
        try {
            let cart = req.body
            console.log(cart)
            const order = await Order.create({ userId: req.uid })
            console.log(order)
            for (let item of cart) {
                const product = await Product.findById(item.productId)
                const price = product?.discounted_price > 0 ? product?.discounted_price : product?.price
                const total = price * item.qty
                await OrderDetail.create({ orderId: order._id, productId:product._id, qty:item.qty,price, total })
                

            }
            res.send({
                message: "Thank you for your order....."
            })
        } catch (err) {
                return errorHandle(err, next)
        }
    }




    }



module.exports = new miscCtrl