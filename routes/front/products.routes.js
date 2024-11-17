const express=require('express')
const {Front}=require('@/controllers')
const { auth } = require('@/lib')
const router=express.Router()

router.get('/featured',Front.ProductsCtrl.featured)
router.get('/latest',Front.ProductsCtrl.latest)
router.get('/top-selling',Front.ProductsCtrl.top)
router.get('/search',Front.ProductsCtrl.search)
router.get('/:id',Front.ProductsCtrl.byId)
router.get('/:id/similar',Front.ProductsCtrl.similar)
router.post('/:id/review',auth,Front.ProductsCtrl.review)



module.exports=router