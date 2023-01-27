const express = require("express")
const router = express.Router()

// 게시글 조회
router.get('/posts', async (req, res) => {})
// 게시글 작성
router.post('/posts', async (req, res) => {})
// 게시글 수정
router.patch('/posts/:id', async (req, res) => {})
// 게시글 삭제
router.delete('/posts/:id', async (req, res) => {})

module.exports = postRouter