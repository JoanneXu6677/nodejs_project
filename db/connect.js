//连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/testdb'), {
    useNewUrlParser: true
};
//连接数据库
var db = mongoose.connection; //数据库连接对象
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("testdb ok")
});