const bcrypt =require('bcryptjs');
const {User}=require('@/models')
const {errorHandle, validationError}=require('@/lib')

class RegisterCtrl{
    register=async(req,res,next)=>{
        try {
            let {name,email,password,confirmPassword,phone,address}=req.body;
           console.log(req.body);
        if(password==confirmPassword){
            const hash=await bcrypt.hash(password,10)
            await User.create({name,email,password:hash,phone,address})
            res.status(201)
            res.json({
                message:"Thank you for registering. Please proceed login"
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
}


module.exports=new RegisterCtrl