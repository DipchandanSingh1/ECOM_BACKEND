const express=require("express")
const {Cms}=require('@/controllers')
const router=express.Router()


router.get('/',Cms.OrdersCtrl.index)

    
    

router.route('/:id')
    .delete(Cms.OrdersCtrl.delete)
    .put(Cms.OrdersCtrl.update)
    .patch(Cms.OrdersCtrl.update)    
  




module.exports=router