const express=require('express')
const {Front}=require('@/controllers')
const { auth, customerAccess } = require('@/lib')

const router=express.Router()
router.get('/categories',Front.miscCtrl.categories)
router.get('/categories/:id',Front.miscCtrl.categoryById)
router.get('/categories/:id/products',Front.miscCtrl.categoryProducts)

router.get('/brands',Front.miscCtrl.brands)
router.get('/brands/:id',Front.miscCtrl.brandById)
router.get('/brands/:id/products',Front.miscCtrl.brandProducts)


router.post('/checkout',auth,customerAccess,Front.miscCtrl.checkout)


module.exports=router