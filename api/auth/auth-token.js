const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./secret')

function tokenBuilder(user) {
    const payload = {
     subject: user.user_id,
     username: user.username,
    }
    const options = {
        expiresIn: '2d',
    }
    const token = jwt.sign(payload, JWT_SECRET, options)
    return token
}
module.exports = { tokenBuilder }