// DB 정보 가져오기
const {Post} = require("../models")

const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll()
        return res.status(200).send({posts})
    } catch (error) {
        console.log(error)
    }
}

const detailPost = async (req, res) => {
    const {id} = req.params
    const post = await Post.findOne({where: {id}})
    try {
        if(!post) {
            return res.status(400).send({errorMessage: "게시글 조회에 실패했습니다."})
        }
        return res.status(200).send({post})
    } catch (error) {
        console.log(error)
    }
}

const createPost = async (req, res) => {
    const {title, content} = req.body
    const userId = res.locals.user.id
    try {
        if(!title || !content) {
            return res.status(412).send({errorMessage: "모든 항목을 작성해주세요."})
        }
        await Post.create({title, content, userId})
        return res.status(201).send({message: "게시글이 생성되었습니다."})
    } catch (error) {
        console.log(error)
    }
}

const editPost = async (req, res) => {
    const {id} = req.params
    const {title, content} = req.body
    const userId = res.locals.user.id
    const post = await Post.findOne({where:{id}})
    try {
        if(!post) {
            return res.status(412).send({errorMessage: "존재하지 않는 게시글입니다."})
        }
        if(post.userId !== userId) {
            return res.status(401).send({errorMessage: "수정 권한이 없는 사용자입니다."})
        }
        if(!title || !content) {
            return res.status(412).send({errorMessage: "모든 항목을 작성해주세요."})
        }
        await Post.update({title, content}, {where:{id}})
        return res.status(201).send({message: "수정이 완료되었습니다."})
    } catch (error) {
        console.log(error)
    }
}

const removePost = async (req, res) => {
    const {id} = req.params
    const userId = res.locals.user.id
    const post = await Post.findOne({where:{id}})
    try {
        if(!post) {
            return res.status(412).send({errorMessage: "존재하지 않는 게시글입니다."})
        }
        if(post.userId !== userId) {
            return res.status(401).send({errorMessage: "삭제 권한이 없는 사용자입니다."})
        }
        await Post.destroy({where:{id}})
        return res.status(201).send({message: "게시글이 삭제되었습니다."})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getPosts, detailPost, createPost, editPost, removePost}