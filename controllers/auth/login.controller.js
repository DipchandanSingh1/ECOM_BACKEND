const { errorHandle, validationError } = require("@/lib");
const { User } = require("@/models");
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
// require('dotenv').config();

class LoginCtrl{
    Login=async(req,res,next)=>{
        try {
            const {email,password}=req.body
            let user=await User.findOne({email}).select('+password')
            if(user){
                if(bcrypt.compareSync(password,user.password)){
                    const token=jwt.sign({
                        uid:user._id,
                        iat:Math.floor(Date.now()/1000),
                        exp:Math.floor(Date.now()/1000)+30*24*60*60,
                    }, process.env.JWT_SECRET)

                    res.send({token})
                }else{
                    return validationError(next,{
                        password:"Password not matched with confirm password",
                    })
                    
                }

            }else{
                return validationError(next,{
                    email:"Provided email not matched record",
                })
            }
            
        } catch (err) {
            return errorHandle(err,next)
        }
    }
}


module.exports=new LoginCtrl