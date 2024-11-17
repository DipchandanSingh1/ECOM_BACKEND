const express=require("express")
const {Cms}=require('@/controllers')
const router=express.Router()
const {upload}=require('@/lib')
const mimeList=["image/jpeg","image/png","image/gif"]

router.route('/')
    .post(upload(mimeList).array('images'),Cms.productCtrl.create)
    .get(Cms.productCtrl.show)
    
    

router.route('/:id')
    .get(Cms.productCtrl.showById)
    .delete(Cms.productCtrl.delete)
    .put(upload(mimeList).array('images'),Cms.productCtrl.update)
    .patch(upload(mimeList).array('images'),Cms.productCtrl.update)    
  
router.delete('/:id/image/:filename',Cms.productCtrl.destroyImages)



module.exports=router