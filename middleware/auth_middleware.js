const jwt = require("jsonwebtoken")
require("dotenv").config()
const {User} = require("../models")



module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        if(!token) {
            return res.status(412).send({errorMessage: "로그인 후 이용 가능합니다."})
        }
        const {id} = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({where: {id}})

        res.locals.user = user
        next()
    } catch (error) {
        return res.status(400).send({errorMessage: "로그인 후 이용 가능합니다."})
    }
}