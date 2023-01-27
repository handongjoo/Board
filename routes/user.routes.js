const express = require("express")
const router = express.Router()
// DB 정보 가져오기
const {User} = require("../models")
// Sequelize 문법
const {Op} = require("sequelize")
// JWT 사용
const jwt = require("jsonwebtoken")
// dotenv 사용
require("dotenv").config()

// 회원가입
router.post('/signup', async (req, res) => {
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
})
// 로그인
router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const existUser = await User.findOne({where: {email}})
    try {
        if(!existUser) {
            return res.status(412).send({errorMessage: "존재하지 않는 유저입니다."})
        }
        if(password !== existUser.password) {
            return res.status(412).send({errorMessage: "패스워드가 틀렸습니다."})
        }
        const token = jwt.sign({id:existUser.id}, process.env.JWT_SECRET, {expiresIn: "10m"})
        return res.status(200).send({message: "로그인 성공"})
    } catch (error) {
        
    }
})
// 로그아웃
router.get('/logout', async (req, res) => {
    
})
// 프로필
router.get('/profile/:id', async (req, res) => {
    const {id} = req.params
    const userProfile = await User.findByPk(id)
    try {
        return res.send({userProfile})
    } catch (error) {
        console.log(error)
    }
})
// 프로필 수정
router.patch('/profile/:id', async (req, res) => {

})

module.exports = router