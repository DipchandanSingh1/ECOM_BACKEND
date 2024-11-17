const express=require('express');
const router=express.Router();
const {Auth}=require('@/controllers');


router.post('/register', Auth.RegisterCtrl.register)
router.post('/login', Auth.LoginCtrl.Login)


module.exports=router;