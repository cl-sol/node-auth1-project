const User = require("../routers/user/user-model");
const bcrypt = require("bcryptjs");

function restrict() {
    return async (req, res, next) => {
        const authError = {
            message: "You shall not pass!"
        }
        try {
            // const { username, password } = req.headers

            // if(!username || !password) {
            //     return res.status(401).json(authError)
            // }

            // const user = await User
            //     .findBy({ username })
            //     .limit(1)

            // if(!user) {
            //     return res.status(401).json(authError)
            // }

            // const passwordValid = await bcrypt.compare(password, user.password)

            // if(!passwordValid) {
            //     return res.status(401).json(authError)
            // }

            if(!req.session || !req.session.user) {
                return res.status(401).json(authError)
            }
            
            next()
        } catch (err){
            next(err)
        }
    }
}

module.exports = {
    restrict
}