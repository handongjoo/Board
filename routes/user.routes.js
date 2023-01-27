const express = require("express")
const router = express.Router()
// 사용자 인증 미들웨어
const userAuth = require("../middleware/auth_middleware")
// controller 가져오기
const userController = require("../controller/user.controller")


// 회원가입
router.post('/signup', userController.userSignup)
// 로그인
router.post('/login', userController.userLogin)
// 로그아웃 (jwt 토큰을 제거하는 방법 or 블랙리스트?)
router.get('/logout', userAuth, userController.userLogout)
// 프로필
router.get('/profile/:id', userController.userProfile)
// 프로필 수정
router.patch('/profile/:id', userAuth, userController.editUserProfile)

module.exports = router