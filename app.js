const express = require("express")
const userRouter = require("./src/routes/user.routes")
const app = express();

require("dotenv").config()
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`${PORT} 연결완료`)
})