# nodejs写的简单接口

背景：有学习过一小段时间的nodejs，跟着做了一套小接口
### 主要功能如下
1. userRouter.js中：
 登录注册接口，注册接口使用的是发送邮箱验证码。
2. fileRouter.js中：
 上传图片，将上传成功的保存在'./static/image'文件下
3. foodRouter.js中：商品数据的增删改查。

### 运行步骤
+ 假设你已经安装好了nodejs和mongoDB
+ 以及确保你的5000端口可正常开启（可在server.js中修改5000接口）
+ 运行命令即可在本地跑
```js
 node server.js
```
+ 若你想直接测试用，可访问使用我的在线接口
