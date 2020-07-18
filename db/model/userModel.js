//创建一个和集合相关的schema对象，表头
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    us: {
        type: String,
        required: true
    },
    ps: {
        type: String,
        required: true
    },
    age: Number,
    sex: {
        type: Number,
        default: 0
    }
});

//将schema对象转化成数据模型
var User = mongoose.model('user', userSchema);

module.exports = User