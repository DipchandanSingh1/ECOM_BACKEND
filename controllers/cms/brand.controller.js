const { validationError, errorHandle } = require('@/lib')
const { Brand } = require('@/models')


class brandCtrl {
    show = async (req, res, next) => {
        try {
            let brand = await Brand.find()
            res.send(brand)
        } catch (err) {
            errorHandle(err, next)

        }
    }
    showById = async (req, res, next) => {
        try {
            let brand = await Brand.findById(req.params.id)
            res.send(brand)
        } catch (err) {
            errorHandle(err, next)

        }



    }
    delete = async (req, res, next) => {
        try {
            let brand = await Brand.findById(req.params.id)
            if (brand) {
                let brand = await Brand.findByIdAndDelete(req.params.id)
                res.send({
                    message: brand.name+ " Brand deleted successfully"
                }
                )
            } else {
                next,
                res.send("Brand not found")
            }
        } catch (err) {
            errorHandle(err, next)

        }
    }

    create = async (req, res, next) => {
        try {
            let { name, status } = req.body
            if (name && status) {
                await Brand.create({ name, status })
                res.status(201)
                res.json({
                    message: "Brand added sucessfully"
                })
            } else {
                return validationError(next, {
                    brand: "Brand not created. Something missing"
                })
            }


        } catch (error) {
            return errorHandle(error, next)
        }
    }
    update = async (req, res, next) => {
        try {
            const brand=await Brand.findById(req.params.id)
            if(brand){
                const {name,status}=req.body
                await Brand.findByIdAndUpdate(req.params.id,{name,status})
                res.send({
                    message: req.body.name+" Brand updated successfully"
                })
            }else{
                return next({
                    message: req.body.name+ ' Brand Not created',
                    status:404
                })
            }
            
        } catch (err) {
            errorHandle(err,next)
            
        }
    }

    


}


module.exports = new brandCtrl