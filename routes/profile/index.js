const express=require("express")
const router=express.Router()
const {Auth}=require('@/controllers')
const {customerAccess}=require('@/lib/index')



// router.get('/',Auth.ProfileCtrl.show)
// router.put('/',Auth.ProfileCtrl.update)
// router.patch('/',Auth.ProfileCtrl.update)
//another method for above routing


router.route('/')
    .get(Auth.ProfileCtrl.show)
    .put(Auth.ProfileCtrl.update)
    .patch(Auth.ProfileCtrl.update)

router.route('/password')
    .put(Auth.ProfileCtrl.updatePassword)
    .patch(Auth.ProfileCtrl.updatePassword)

router.get('/reviews',customerAccess,Auth.ProfileCtrl.reviews)
router.get('/orders',Auth.ProfileCtrl.orders)

module.exports=router