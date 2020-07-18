"use strict";
const nodemailer = require("nodemailer");

// 创建发送邮件请求对象
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com", //主机 发送方邮箱
    port: 465, //端口号
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'xmj6677@qq.com', // generated ethereal user 发送方邮箱地址
        pass: 'xestbkqwbohqbaid' // generated ethereal password    mtp验证码
    }
});

//邮件信息
//验证码6位
// var Num = Math.floor(Math.random() * 999999);
// console.log("验证码", Num)



function send(mail, code) {
    let mailObj = {
        from: '"Fred Foo 👻" <xmj6677@qq.com>', // sender address
        to: mail, // list of receivers 发给谁
        subject: "Hello ✔", // Subject line 标题
        text: "您的验证码是" + code + "，有效期五分钟", // plain text body 文本信息 只能输字符串
        //html: "<b>Hello world?</b>" // html body 页面  文本和页面只能有一个
    }
    return new Promise((resolve, reject) => {
        //发送邮件
        transporter.sendMail(mailObj, (err, data) => {
            if (err == null) {
                resolve()
            } else {
                reject()
            }

        })
    })

}

module.exports = {
    send: send
} //抛出一个对象