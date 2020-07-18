const express = require('express')
const router = express.Router()
const multer = require('multer')

/**
 * @api {post} /file/upload 上传图片
 * @apiName upload
 * @apiGroup File
 *
 * @apiParam {form-data} uploads 选择一张图片.

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

var storage = multer.diskStorage({
    //设置上传后的文件路径，uploads自动创建，文件名
    destination: function(req, file, cb) {
        cb(null, './static/image')
    },
    //给上传的文件添加后缀
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split('.');
        //给图片加上时间戳防止重命名
        //比如把abc.jpg图片切割成数组[abc,jpg]，然后用数组长度-1获取后缀名
        let ext = fileFormat[fileFormat.length - 1];
        let tmpName = Date.now() + parseInt(Math.random() * 9999)
        cb(null, `${tmpName}.${ext}`);
    }
});

var upload = multer({
    storage: storage
});

router.post('/upload', upload.single('uploads'), (req, res) => {
    //single后接的这个字段必须和前端保持统一 这是key值
    console.log('req.file', req.file)
    let url = `/public/image/${req.file.filename}`
    res.send({
        err: 0,
        msg: '上传成功',
        img: url
    });
    /*拦截却没有阻止
    let {
        size,
        mimetype,
        path
    } = req.file
    let types = ['jpg', 'jpeg', 'png', 'gif']
    let tmpType = mimetype.split('/')[1]
    if (size > 500 * 1024) {
        return res.send({
            err: -1,
            msg: '尺寸过大'
        })
    } else if (types.indexOf(tmpType) == -1) {
        return res.send({
            err: -2,
            msg: '媒体类型错误'
        })
    } else {
        res.send({
            err: 0,
            msg: '上传成功'
        });
    }*/

})


module.exports = router