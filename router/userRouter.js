const express = require('express')
const router = express.Router()
const User = require('../db/model/userModel')
const Mail = require('../util/mail')

let codes = {} //通过内存保存验证码

/**
 * @api {post} /user/reg 用户注册
 * @apiName register
 * @apiGroup User
 *
 * @apiParam {String} us 用户名.
 *  @apiParam {String} ps 用户密码.
 *  @apiParam {String} code 邮箱验证码.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.post('/reg', (req, res) => {
    //获取数据
    let {
        us,
        ps,
        code
    } = req.body
    console.log(us, ps, code, codes[0])
    if (us && ps && code) {
        if (codes[0] != code) {
            return res.send({
                err: -4,
                msg: '验证码错误'
            })
        }
        User.find({
                us
            })
            .then((data) => {
                console.log(data)
                if (data.length > 0) {
                    res.send({
                        err: 0,
                        msg: '用户已存在'
                    })
                } else {
                    //用户名不存在 可注册
                    return User.insertMany({
                        us,
                        ps
                    })
                }
            })
            .then(() => {
                res.send('注册成功')

            })
            .catch((err) => {
                return res.send({
                    err: "内部错误"
                })
            })

    } else {
        res.send({
            err: '用户名或密码为空'
        })
    }
})

/**
 * @api {post} /user/login 用户登录
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} us 用户名.
 *  @apiParam {String} ps 用户密码.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.post('/login', (req, res) => {
    let {
        us,
        ps
    } = req.body
    if (!us || !ps) {
        return res.send({
            msg: "参数错误"
        })
    }
    User.find({
            us,
            ps
        })
        .then((data) => {
            console.log(data)
            if (data.length > 0) {
                res.send({
                    err: 0,
                    msg: '登录成功'
                })
            } else {
                res.send({
                    err: -2,
                    msg: '用户名或密码错误'
                })
            }
        }).catch((err) => {
            return res.send({
                err: "内部错误"
            })
        })
})

/**
 * @api {post} /user/getMailCode 发送邮箱验证码
 * @apiName getMailCode
 * @apiGroup User
 *
 * @apiParam {String} mail 邮箱.

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

//发送邮箱验证码
router.post('/getMailCode', (req, res) => {
    let {
        mail
    } = req.body
    let code = parseInt(Math.random() * 999999)

    Mail.send(mail, code)
        .then(() => {
            codes[0] = code
                //保存到缓存中
            res.send({
                err: 0,
                msg: '验证码发送成功'
            })
        })
        .catch((err) => {
            console.log(err)
            res.send({
                err: -1,
                msg: '验证码发送失败'
            })
        })
})

module.exports = router