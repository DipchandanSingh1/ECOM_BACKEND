const {Schema,model}=require('mongoose');
const { modelConfig } = require('@/config');

const Order=model('Order',new Schema({
    
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },  
    

    status:{
        type:String,
        enum:['Processing','confirmed','shipping','delivered',"Cancelled"],
        default:'Processing',
    },
},modelConfig))

module.exports=Order