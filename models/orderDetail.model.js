const {Schema,model}=require('mongoose');
const { modelConfig } = require('@/config');

const orderDetail=model('OrderDetail',new Schema({
    
    
    orderId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },
    productId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"product"
    },
    price:{
        type:Number,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    },
    total:{
        type:Number,
        required:true,
    },

    status:{
        type:Boolean,
        default:true
    },
},modelConfig))

module.exports=orderDetail