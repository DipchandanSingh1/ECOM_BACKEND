const express=require("express")
const staffsRoutes=require('./staffs.routes.js')
const customersRoutes=require('./customers.routes.js')
const brandRoutes=require('./brands.routes.js')
const categoryRoutes=require('./category.routes.js')
const productRoutes=require('./product.routes.js')
const reviewRoutes=require('./reviews.routes.js')
const orderRoutes=require('./orders.routes.js')
const { adminAccess } = require("@/lib/index.js")
const router=express.Router()


router.use('/staffs',adminAccess,staffsRoutes)
router.use('/customers',adminAccess,customersRoutes)
router.use('/brands',brandRoutes)
router.use('/category',categoryRoutes)
router.use('/product',productRoutes)
router.use('/reviews',reviewRoutes)
router.use('/orders',orderRoutes)





module.exports=router