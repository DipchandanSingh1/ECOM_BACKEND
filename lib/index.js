
const { User } = require('@/models')
const jwt=require('jsonwebtoken')
const multer = require('multer')



const errorHandle=(error,next)=>{
    console.log(error)
    if(error.code==11000){
        let errors={}
        for(let k in error.keyValue){
            errors[k]=`the provided value for ${k} is already used`
        }
        return next({
            message:"there somes to be validation error",
            errors,
            status:422
        })
    }
    if ('errors' in error){
        let errors={}
        for(let k in error.errors){
            errors[k]=error.errors[k].message
        }
        return next({
            message:"There seems to be some validation error",
            errors,
            status:422
        })
    }


    return next({
        message:"there seems to be something wrong",
        status:422
    })


}

const auth =async(req,res,next)=>{
    try {
        if('authorization' in req.headers){
            const token=req.headers['authorization'].split(' ')[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            const uid=decoded.uid
            const user=await User.findById(uid)
            if(user){
                req.uid=uid
                req.user=user
                next()

            }else{
                return next({
                    message:'Invalid token',
                    status:401
                })
            }
        }else{
            return next({
                message:'token missing',
                status:401
            })
        }
        
    } catch (error) {
        return next({
            message:'Invalid token',
            status:401
        })
        
    }
}
const validationError=(next,errors)=>next({
    message:"There seems to be some validation error",
    errors,
    status:422
})

const cmsAccess=(req,res,next)=>{
    if(req.user.roll=='Customer'){
        
        return next({
            message:'accessed denied',
            status:403
        })
    }
    next()

}

const customerAccess=(req,res,next)=>{
    if(req.user.roll!="Customer"){
        return next({
            message:'accessed denied',
            status:403
        })
    }
    next()

}

const adminAccess=(req,res,next)=>{
    if(req.user.roll=='Staffs'){
        return next({
            message:'accessed denied',
            status:403
        })
    }
    next()

}
const notFoundError=(name,next)=>{
    return next({
        message:`${name} not found`
    })
}
const upload=(mimeList=[])=>multer({
    storage:multer.diskStorage({
        filename:(req,file,cb)=>{
            const ext=file.originalname.split('.').pop()
            const filename='file'+Date.now() + '-' + Math.round(Math.random() * 1E9)+`.${ext}`

            cb(null,filename)
            
        },
        destination:(req,file,cb)=>{
            cb(null,'./uploads')
        }
    }),
    fileFilter:(req,file,cb)=>{
        if(mimeList.length>0){
            if(mimeList.includes(file.mimetype)){
                cb(null,true)
            }else{
                cb(new Error('File type not supported'))
            }

        }else{
            cb(null,true)
        }
    }


})


module.exports={errorHandle,auth,validationError,cmsAccess,customerAccess,adminAccess,notFoundError,upload};