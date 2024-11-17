const express=require("express")
const {Cms}=require('@/controllers')
const router=express.Router()


router.get('/',Cms.ReviewsCtrl.show)
router.delete('/:id',Cms.ReviewsCtrl.delete)
    

router.route('/:id')
    
  




module.exports=router