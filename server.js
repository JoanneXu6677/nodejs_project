const express = require('express')
const db = require('./db/connect')
const app = express()
const path = require('path')


const bodyparser = require('body-parser')
    //app.user 使用中间件
    //解析表单数据 x-www-form-urlencoded
app.use(bodyparser.urlencoded({
        extended: false
    }))
    //解析json
app.use(bodyparser.json())

//cors跨域
const cors = require('cors')
app.use(cors())



//引入路由
const userRouter = require('./router/userRouter')
const foodRouter = require('./router/foodRouter')
const fileRouter = require('./router/fileRouter')
app.use('/user', userRouter)
app.use('/food', foodRouter)
app.use('/file', fileRouter)
    //指定静态资源
app.use('/public', express.static(path.join(__dirname, './static')))


app.listen(5000, () => {
    console.log('server start 5000')
})