const bcrypt = require('bcryptjs')
const Users =  require('../users/user-model')

const validateUsername = async (req, res, next) => {
    try{
        const { username } = req.body
        const user = await Users.get()
        user.map(each => {
                if( each.username === username ){
                    next({ status: 400, message: "username taken"})
                }
        })
    next()
    } catch (err) {
        next(err)
    }
}

const validatePhone = async (req, res, next) => {
    try{
        const { phoneNumber } = req.body
        const user = await Users.get()
        user.map(each => {
                if( each.phoneNumber === phoneNumber){
                    next({ status: 400, message: "phone number is being used"})
                }
            })
        if (isNaN(phoneNumber) || phoneNumber.length !==10){
            next({status:400, message: "enter a 10 digit number"})
        }
        next()
    } catch (err){
        next(err)
    }
}

const validatePhoneUpdate = async (req, res, next) => {
    try {
        const { phoneNumber, user_id } = req.body
        const exactUser = await Users.getById(user_id)
        const user = await Users.get()
        if (isNaN(phoneNumber) || phoneNumber.length !== 10){
            next({ status: 400, message: "enter a 10 digit number"})
        }
        user.map(each => {
            const number = each.phoneNumber
                if( number === phoneNumber && number !== exactUser[0].phoneNumber) {
                    next({ status: 400, message: "phone number is being used" })
                }
            })
        next()
    } catch (err) {
        next(err)
    }
}

const validateInfo = async (req, res,next) => {
    try{
        const { username, password } = req.body
        if (!username || !password) {
            next({ status: 400, message: "username and password are required"})
        }
        next()
    } catch (err){
        next(err)
    }
}

const validatePasswordChange = async (req, res, next) =>{
    const { user_id, oldPassword } = req.body
    const [user] = await Users.getById(user_id)

    if ( !oldPassword ){
        next()
    }else if (user && bcrypt.compareSync(oldPassword, user.password)){
        next()
    }else {
        next({ status: 401, message: 'Invalid password' })
    }
}

module.exports ={
    validateUsername,
    validatePhoneUpdate,
    validatePhone,
    validateInfo,
    validatePasswordChange
}