const { errorHandle, validationError } = require("@/lib")
const bcrypt=require('bcryptjs')
const { User } = require("@/models")





class customerCtrl{
    index=async(req,res,next)=>{
        try {
            const users=await User.find({roll:'Customer'})
            res.send(users)

        } catch (err) {
            errorHandle(err,next)
        }

    }
    store=async(req,res,next)=>{
        try {
            let {name,email,password,confirmPassword,phone,address,status}=req.body;
           console.log(req.body);
        if(password==confirmPassword){
            const hash=await bcrypt.hash(password,10)
            await User.create({name,email,password:hash,phone,address,status, roll:'Customer'})
            res.status(201)
            res.json({
                message:"Customer added sucessfully"
            })
        }else{
            return validationError(next,{
                password:"Password not matched with confirm password",
            })
        }
        
       } catch (err) {
            return errorHandle(err,next)
       }
        
    }

    show=async(req,res,next)=>{
        try {
            const user=await User.findById(req.params.id)
            if(user && user.roll=='Customer'){
                res.send(user)
            }else{
                return next({
                    message:'Customer not found',
                    status:404
                })
            }
            
        } catch (err) {
            errorHandle(err,next)
            
        }

        
    }

    update=async(req,res,next)=>{
        try {
            const user=await User.findById(req.params.id)
            if(user && user.roll=='Customer'){
                const {name,email,phone,address,status}=req.body
                await User.findByIdAndUpdate(req.params.id,{name,email,phone,address,status})
                res.send({
                    message:"Customer updated successfully"
                })
            }else{
                return next({
                    message:'Customer not found',
                    status:404
                })
            }
            
        } catch (err) {
            errorHandle(err,next)
            
        }
        
    }

    destroy=async(req,res,next)=>{
        
        try {
            const user=await User.findById(req.params.id)
            if(user && user.roll=='Customer'){
                await User.findByIdAndDelete(req.params.id)
                res.send({
                    message:"Customer deleted successfully"
                })
            }else{
                return next({
                    message:'Customer not found',
                    status:404
                })
            }
            
        } catch (err) {
            errorHandle(err,next)
            
        }

    }


}


module.exports=new customerCtrl