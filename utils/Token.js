const jwt = require('jsonwebtoken')

const generateKey = () => {
    return require('crypto').randomBytes(64).toString('hex')
}

const generateTokenUser = (userData) => {
    return jwt.sign(userData, process.env.SECRET_KEY_USER, { expiresIn: '2d' })
}

const generateTokenApp = () => {
    // return jwt.sign(username, process.env.SECRET_KEY, { expiresIn: '1800s' });
    return jwt.sign('application', process.env.SECRET_KEY);
}

const authenticateTokenApp = (req) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) {
        return false
    } else {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            
            if(err) return false
            
            return true
            
        })
    }
}




module.exports = {generateTokenApp, authenticateTokenApp, generateKey, generateTokenUser}