const express = require("express")
const router = express.Router()

// 회원가입
router.post('/signup', async (req, res) => {

})
// 로그인
router.post('/login', async (req, res) => {
    
})
// 로그아웃
router.get('/logout', async (req, res) => {
    
})
// 프로필
router.get('/profile', async (req, res) => {
    
})
// 프로필 수정
router.patch('/profile/:id', async (req, res) => {

})

module.exports = userRouter