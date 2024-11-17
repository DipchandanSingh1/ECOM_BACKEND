const { errorHandle, notFoundError } = require("@/lib")
const { Product, Review } = require("@/models")
const {Types}=require('mongoose')

class ProductsCtrl{
    featured=async(req,res,next)=>{
        try {
            const featured=await Product.find({status:true, featured:true}).limit(4)
            res.send(featured)
            
        } catch (err) {
            return errorHandle(err,next)
        }
    }
    latest=async(req,res,next)=>{
        try {
            const latest=await Product.find({status:true}).limit(4).sort({createdAt:'desc'})
            res.send(latest)
            
        } catch (err) {
            return errorHandle(err,next)
        }
    }
    top=async(req,res,next)=>{
        try {
            const top=await Product.aggregate()
            .match({status:true})
            .lookup({from:'orderdetails',localField:'_id',foreignField:'productId',as:'details'})
            .addFields({details:{$size:'$details'}})
            .sort({details:'desc'})
            .limit(4)
            res.send(top)
            
        } catch (err) {
            return errorHandle(err,next)
        }
    }
    byId=async(req,res,next)=>{
        try {
            let product=await Product.aggregate()
                .match({status:true,_id:new Types.ObjectId(req.params.id)})
                .lookup({from:'brands',localField:'brandId',foreignField:'_id', as:'brand'})

                if(product.length>0){
                    product=product[0]
                    product.brand=product.brand[0]
                    let reviews=await Review.aggregate()
                        .match({productId:product._id})
                        .lookup({from:'users',localField:'userId',foreignField:'_id',as:'user'})
                        for(let i in reviews){
                            reviews[i].user=reviews[i].user[0]
                        }
                        product.reviews=reviews
                    res.send(product)
                }else{
                    return notFoundError('product',next)
                }


            
        } catch (err) {
            return errorHandle(err,next)
            
        }
    }
    similar=async(req,res,next)=>{
        try {
            const product=await Product.findOne({status:true,_id:req.params.id})
            const similar=await Product.find({status:true,categoryId:product.categoryId,_id:{$ne:product._id}})
            res.send(similar)
            
        } catch (err) {
            return errorHandle(err,next)
        }
    }
    review=async(req,res,next)=>{
        try {
            const {comment,rating}=req.body
            await Review.create({comment,rating,userId:req.uid,productId:req.params.id})
            
            res.send({
                message:"Thank you for your review"
            })
        } catch (err) {
            return errorHandle(err,next)
            
        }
    }
    search=async(req,res,next)=>{
        try {
            const products=await Product.find({
                status:true,
                name:{$regex:req.query.term,$options:'i'},
                
            })
            res.send(products)
        } catch (err) {
            return errorHandle(err,next)
        }
    }
}

module.exports=new ProductsCtrl