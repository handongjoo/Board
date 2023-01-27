const express = require("express")
const userRouter = require("./routes/user.routes")
const postRouter = require("./routes/post.routes")
const commentRouter = require("./routes/comment.routes")
const app = express();

app.use(express.json())
app.use('/', [userRouter, postRouter, commentRouter])

require("dotenv").config()
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`${PORT} 연결완료`)
})