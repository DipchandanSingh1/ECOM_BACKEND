const express=require("express")
const {Cms}=require('@/controllers')
const router=express.Router()


router.route('/')
    .post(Cms.brandCtrl.create)
    .get(Cms.brandCtrl.show)
    
    

router.route('/:id')
    .get(Cms.brandCtrl.showById)
    .delete(Cms.brandCtrl.delete)
    .put(Cms.brandCtrl.update)
    .patch(Cms.brandCtrl.update)    
  




module.exports=router