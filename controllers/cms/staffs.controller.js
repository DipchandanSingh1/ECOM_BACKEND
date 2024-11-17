const { errorHandle, validationError } = require("@/lib")
const bcrypt=require('bcryptjs')
const { User } = require("@/models")





class StaffsCtrl{
    index=async(req,res,next)=>{
        try {
            const users=await User.find({roll:'Staff'})
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
            await User.create({name,email,password:hash,phone,address,status, roll:'Staff'})
            res.status(201)
            res.json({
                message:"Staff added sucessfully"
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
            if(user && user.roll=='Staff'){
                res.send(user)
            }else{
                return next({
                    message:'Staff not found',
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
            if(user && user.roll=='Staff'){
                const {name,email,phone,address,status}=req.body
                await User.findByIdAndUpdate(req.params.id,{name,email,phone,address,status})
                res.send({
                    message:"staff updated successfully"
                })
            }else{
                return next({
                    message:'Staff not found',
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
            if(user && user.roll=='Staff'){
                await User.findByIdAndDelete(req.params.id)
                res.send({
                    message:"Staff deleted successfully"
                })
            }else{
                return next({
                    message:'Staff not found',
                    status:404
                })
            }
            
        } catch (err) {
            errorHandle(err,next)
            
        }

    }


}


module.exports=new StaffsCtrl