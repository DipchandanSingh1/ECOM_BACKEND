const express=require("express")
const {Cms}=require('@/controllers')
const router=express.Router()


router.route('/')
    .post(Cms.categoryCtrl.create)
    .get(Cms.categoryCtrl.show)
    
    

router.route('/:id')
    .get(Cms.categoryCtrl.showById)
    .delete(Cms.categoryCtrl.delete)
    .put(Cms.categoryCtrl.update)
    .patch(Cms.categoryCtrl.update)    
  




module.exports=router