const express = require('express')
const router = express.Router()
const foodModel = require('../db/model/foodModel')
    /**
     * @api {post} /food/add 添加
     * @apiName addfood
     * @apiGroup Food
     *
     * @apiParam {String} name 名称.
     * @apiParam {String} price 价格.
     * @apiParam {String} desc 描述. 
     * @apiParam {String} typename 类名. 
     * @apiParam {String} typeid 类别id. 
     * @apiParam {String} img 图片. 

     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     */
router.post('/add', (req, res) => {
        // let data = {
        //     name: '火山飘雪',
        //     price: '9999',
        //     desc: '超好吃',
        //     typename: '凉菜',
        //     typeid: 1,
        //     img: '/public/image/01.jpg'
        // }
        let {
            name,
            price,
            desc,
            typename,
            typeid,
            img
        } = req.body

        //判断参数是否ok 注意格式！！！

        foodModel.find({
                name
            })
            .then((data) => {
                if (data.length > 0) {
                    res.send({
                        err: 0,
                        msg: '添加失败，名称已存在'
                    })
                } else {
                    //名称不存在 可插入
                    return foodModel.insertMany({
                        name,
                        price,
                        desc,
                        typename,
                        typeid,
                        img
                    })
                }
            })
            .then((data) => {
                res.send({
                    err: 0,
                    msg: '添加成功'
                })
            })
            .catch((data) => {
                res.send({
                    err: -1,
                    msg: data
                })
            })

    })
    /**
     * @api {post} /food/getInfoByType 分类查询
     * @apiName getIndoByType
     * @apiGroup Food
     *
     * @apiParam {String} typeid 名称.

     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     */
router.post('/getInfoByType', (req, res) => {
        let typeid = 1
        foodModel.find({
                typeid
            })
            .then((data) => {
                res.send({
                    err: 0,
                    msg: '查询成功',
                    list: data
                })
            })
            .catch((data) => {
                res.send({
                    err: 0,
                    msg: "查询失败"
                })
            })
    })
    /**
     * @api {post} /food/getInfoByKw 关键字查询
     * @apiName getIndoByKw
     * @apiGroup Food
     *
     * @apiParam {String} kw 关键字.

     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     */
router.post('/getInfoByKw', (req, res) => {
        //正则表达式匹配某一个字段
        let {
            kw
        } = req.body
        let reg = new RegExp(kw)
            // foodModel.find({
            //         name: {
            //             $regex: reg
            //         }
            //     })   名字模糊

        //匹配名字和描述
        foodModel.find({
                $or: [{
                    name: {
                        $regex: reg
                    }
                }, {
                    desc: {
                        $regex: reg
                    }
                }]
            })
            .then((data) => {
                res.send({
                    err: 0,
                    msg: '查询成功',
                    list: data
                })
            })
            .catch((data) => {
                res.send({
                    err: 0,
                    msg: "查询失败"
                })
            })
    })
    /**
     * @api {post} /food/del 删除
     * @apiName delete
     * @apiGroup Food
     *
     * @apiParam {String} _id id号.

     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     */
router.post('/del', (req, res) => {
        let {
            _id,
            // id1
        } = req.body

        /*多个删除
        foodModel.deleteMany({
                _id: [_id,
                    id1
                ]
            })
            */

        foodModel.deleteOne({
                _id: _id
            })
            .then((data) => {
                res.send({
                    err: 0,
                    msg: '删除成功',
                })
            })
            .catch((data) => {
                res.send({
                    err: 0,
                    msg: "删除失败"
                })
            })
    })
    /**
         * @api {post} /food/update 修改
         * @apiName update
         * @apiGroup Food
         *
         * @apiParam _id 必传
         * @apiParam name,price,desc,typename,typeid,img json格式

         *
         * @apiSuccess {String} firstname Firstname of the User.
         * @apiSuccess {String} lastname  Lastname of the User.
         */
router.post('/update', (req, res) => {
    let {
        name,
        price,
        desc,
        typename,
        typeid,
        img,
        _id
    } = req.body
    foodModel.update({
            _id
        }, {
            name,
            price,
            desc,
            typename,
            typeid,
            img
        })
        .then((data) => {
            res.send({
                err: 0,
                msg: '修改成功',
            })
        })
        .catch((data) => {
            res.send({
                err: 0,
                msg: "修改失败"
            })
        })
})

/**
     * @api {post} /food/getInfoByPage 分页查询
     * @apiName getInfoByPage 
     * @apiGroup Food
     *
     * @apiParam {Number} pageSize 每页条数，默认为5
     * @apiParam {Number} page 第几页，默认为1

     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     */
router.post('/getInfoByPage', (req, res) => {
    let pageSize = req.body.pageSize || 5 //默认值
    let page = req.body.page || 1
    foodModel.find().limit(Number(pageSize)).skip(Number((page - 1) * pageSize))
        .then((data) => {
            res.send({
                err: 0,
                msg: '查询成功',
                list: data
            })
        })
        .catch((data) => {
            res.send({
                err: 0,
                msg: "查询失败"
            })
        })
})
module.exports = router