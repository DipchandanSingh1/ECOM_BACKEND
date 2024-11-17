const express=require('express')
const ProductRoutes=require('./products.routes.js')
const router=express.Router()
const miscRoutes=require('./misc.routes.js')

router.use('/products',ProductRoutes)
router.use(miscRoutes)
router.get('/image/:filename',(req,res,next)=>{
    res.sendFile(`/uploads/${req.params.filename}`,{
        root:'./' 
    })
})


module.exports=router


