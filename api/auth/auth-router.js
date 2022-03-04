const { BCRYPT } = require('./secret')
const router = require('express').Router()
const User = require('../users/user-model')
const { validateUsername, validateInfo, validatePhoneUpdate, validatePhone, validatePasswordChange } = require('./auth-middleware')

const bcrypt = require('bcryptjs')

const { tokenBuilder } = require('./auth-token')

router.post('/register', validateUsername, validateInfo,validatePhone, async (req, res, next) =>{
    try {
        const { username, password } = req.body
        const hash = bcrypt.hashSync(password, BCRYPT)
        const newUser = { ...req.body, password: hash }
        await User.create(newUser)
        res.status(201).json(`Welcome, ${username}`)
    }catch (err){
        next(err)
    }
} )

router.post('/login', validateInfo, async (req, res, next) =>{
    try {
        const { username, password } = req.body
        const [user] = await User.getBy({ username })
        if(user && bcrypt.compareSync(password, user.password)){
            const token = tokenBuilder(user)
            res.json({ message: `Welcome, ${user.username}`, token, user_id: user.user_id })
        }else {
            next({status: 401, message: 'Invalid credentials' })
        }
    }catch (err){
        next(err)
    }
} )
router.put('/update', validatePhoneUpdate, validatePasswordChange, async (req, res, next) => {
    const user = req.body
    const { user_id, password } = user
    if(!password) {
        User.update(user_id, req.body)
        .then( () => {
            res.status(200).json("Update successful")
        })
        .catch(next)
    }else {
     const updates = {password: user.password, phoneNumber: user.phoneNumber}
     updates.password = bcrypt.hashSync(updates.password, BCRYPT)
    
     User.update(user_id, updates)
        .then( () => {
            res.status(200).json("Updates Successful")
        })
        .catch(next)
    }
})

module.exports = router;