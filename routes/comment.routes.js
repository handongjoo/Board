const express = require("express")
const router = express.Router()

// 내가 쓴 댓글 조회
router.get('/comments/:userId', async (req, res) => {})
// 댓글 작성
router.post('/comments', async (req, res) => {})
// 댓글 수정
router.patch('/comments/:id', async (req, res) => {})
// 댓글 삭제
router.delete('/comments/:id', async (req, res) => {})

module.exports = router