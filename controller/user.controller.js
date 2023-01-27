// DB 정보 가져오기
const {User} = require("../models")
// Sequelize 문법
const {Op} = require("sequelize")
// JWT 사용
const jwt = require("jsonwebtoken")
// dotenv 사용
require("dotenv").config()

// 회원가입
const userSignup = async (req, res) => {
    const {email, nickname, password, confirm} = req.body
    const existUser = await User.findOne({
        where: {
            [Op.or]: 
            [{email}, {nickname}]
        }
    })
    try {
        if(password !== confirm) {
            return res.status(412).send({errorMessage: "패스워드가 일치하지 않습니다."})
        }
        if(existUser && email === existUser.email) {
            return res.status(412).send({errorMessage: "중복된 이메일 입니다."})
        }
        if(existUser && nickname === existUser.nickname) {
            return res.status(412).send({errorMessage: "중복된 닉네임 입니다."})
        }
        await User.create({email, nickname, password})
        return res.status(200).send({message: "회원가입에 성공하였습니다."})
    } catch (error) {
        console.log(error)
    }
}

// 로그인
const userLogin = async (req, res) => {
    const {email, password} = req.body
    const existUser = await User.findOne({where: {email}})
    try {
        if(!existUser) {
            return res.status(412).send({errorMessage: "존재하지 않는 유저입니다."})
        }
        if(password !== existUser.password) {
            return res.status(412).send({errorMessage: "패스워드가 틀렸습니다."})
        }
        const token = jwt.sign(
            {id:existUser.id}, 
            process.env.JWT_SECRET, 
            {expiresIn: "10m"}
            )
        return res.status(200).send({message: "로그인 성공", token})
    } catch (error) {
        console.log(error)
    }
}

// 로그아웃 (jwt 토큰을 제거하는 방법 or 블랙리스트?)
const userLogout = async (req, res) => {
    delete res.locals.user
    return res.send({message: "로그아웃 완료"})
}

// 프로필
const userProfile = async (req, res) => {
    const {id} = req.params
    const userProfile = await User.findByPk(id)
    try {
        if(userProfile) {
            return res.send({userProfile})
        }
    } catch (error) {
        console.log(error)
    }
}

//프로필 수정
const editUserProfile = async (req, res) => {
    const {id} = req.params
    const {nickname} = req.body
    const existNickname = await User.findOne({where:{nickname}})
    const userId = res.locals.user.id
    console.log(userId)
    try {
        if(Number(id) !== userId) {
            return res.status(401).send({errorMessage: "수정 권한이 없는 사용자입니다."})
        }
        if(existNickname) {
            return res.status(412).send({errorMessage: "중복된 닉네임입니다."})
        }
        if(!nickname) {
            return res.status(412).send({errorMessage: "모든 항목을 작성해주세요."})
        }
        await User.update({nickname}, {where : {id}})
        return res.status(201).send({message: "프로필 수정이 완료되었습니다."})
    } catch (error) {
        
    }
}

module.exports = {userSignup, userLogin, userLogout, userProfile, editUserProfile}