const express = require("express")
const router = express.Router()

// 유저 인증 미들웨어
const userAuth = require("../middleware/auth_middleware")
// Post controller 가져오기
const postController = require("../controller/post.controller")

// 게시글 조회
router.get('/posts', postController.getPosts)
// 게시글 상세 조회
router.get('/posts/:id', postController.detailPost)
// 게시글 작성
router.post('/posts', userAuth, postController.createPost)
// 게시글 수정
router.patch('/posts/:id', userAuth, postController.editPost)
// 게시글 삭제
router.delete('/posts/:id', userAuth, postController.removePost)

module.exports = router