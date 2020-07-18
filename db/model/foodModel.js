//创建一个和集合相关的schema对象，表头
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    typename: {
        type: String,
        required: true
    },
    typeid: {
        type: Number,
        required: true
    }, //类别 用数字表示
    img: {
        type: String,
        required: true
    },
});

//将schema对象转化成数据模型
var Food = mongoose.model('foods', foodSchema);

module.exports = Food