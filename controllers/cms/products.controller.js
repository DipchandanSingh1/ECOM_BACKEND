const { validationError, errorHandle } = require('@/lib')
const { Product, Category } = require('@/models')
const {unlinkSync}=require('fs')


class productCtrl {
    show = async (req, res, next) => {
        try {
            let products = await Product.aggregate([
                {$lookup:{from :'categories', localField:'categoryId',foreignField:'_id', as:'category'}},
                {$lookup:{from :'brands', localField:'brandId',foreignField:'_id', as:'brand'}}
            ])
            let newList=[]
            for(let i in products){
                newList.push({
                    ...products[i],
                    Category:products[i].category[0],
                    brand:products[i].brand[0]
                })
            }


            res.send(newList)
        } catch (err) {
            errorHandle(err, next)

        }
    }
    showById = async (req, res, next) => {
        try {
            let product = await Product.findById(req.params.id)
            res.send(product)
        } catch (err) {
            errorHandle(err, next)

        }



    }
    delete = async (req, res, next) => {
        try {
            const deleteProduct = await Product.findById(req.params.id)
            if (deleteProduct) {
                for(let image of deleteProduct.images){
                    unlinkSync(`./uploads/${image}`)
                }
                let deletedProduct = await Product.findByIdAndDelete(req.params.id)
                res.send({
                    message:  " Product deleted successfully"
                }
                )
            } else {
                next,
                res.send("Product not found")
            }
        } catch (err) {
            errorHandle(err, next)

        }
    }

    create = async (req, res, next) => {
        try {
            let { name,description,summary,featured,price, categoryId,discounted_price, brandId, status} = req.body
            const images=req.files.map(file=>file.filename)
            if (name) {
                await Product.create({ name,featured, description,summary,price,discounted_price,categoryId,brandId,status ,images})
                res.status(201)
                res.json({
                    message: "Product added sucessfully"
                })
            } else {
                return validationError(next, {
                    product: "Product not created. Something missing"
                })
            }


        } catch (error) {
            return errorHandle(error, next)
        }
    }
    update = async (req, res, next) => {
        try {
            const product=await Product.findById(req.params.id)
            let images=product.images
            if(req.files){
                let temp=req.files.map(file=>file.filename)
                images=[...images,...temp]
            }

            if(product){
                const {name,description,summary,price, categoryId, brandId,featured, status,discounted_price}=req.body
                await Product.findByIdAndUpdate(req.params.id,{name,description,summary,price, categoryId, brandId,featured, status,images,discounted_price})
                res.send({
                    message: " Product updated successfully"
                })
            }else{
                return next({
                    message: ' Product Not created',
                    status:404
                })
            }
            
        } catch (err) {
            errorHandle(err,next)
            
        }
    }

    destroyImages=async (req, res, next) => {
        try {
            const products = await Product.findById(req.params.id)
            if (products) {
                
                    unlinkSync(`./uploads/${req.params.filename}`)
                    let images=products.images.filter(image=> image !=req.params.filename)
                    await Product.findByIdAndUpdate(req.params.id,{images})
                
                
                res.send({
                    message:  " Product image deleted successfully"
                }
                )
            } else {
                next,
                res.send("Product not found")
            }
        } catch (err) {
            errorHandle(err, next)

        }
    }


}


module.exports = new productCtrl