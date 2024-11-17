const express=require('express')
const router=express.Router();
const authRoutes=require('./auth/index.js')
const profileRoutes=require('./profile');
const cmsRoutes=require('./cms')
const ProductRoutes=require('./front')
const { auth, cmsAccess, customerAccess } = require('@/lib/index.js');
const { Auth } = require('@/controllers/index.js');



router.use('/auth',authRoutes)
router.use('/profile',auth,profileRoutes)  //here auth is login middlewere to check user is log in or not
router.use('/cms',auth,cmsAccess,cmsRoutes)
router.use(ProductRoutes)



module.exports=router;