# nodeJS建站demo
> 课程来自http://www.imooc.com/learn/75

### 说明
#### 第一次写readme,就随便介绍一下这个demo的内容和踩的坑吧
* 内容
  1. 用到的组件
   * express
   * bower
   * MongoDB+mongoose
   * path
   * underscore
   * bootstrap
  2. html部分使用了jade,jade已更名为pug,但目前两个后缀均可使用

   * jade教程https://segmentfault.com/a/1190000000357534
   * 使用jade的extends和block进行html代码复用
  3. 连接MongoDB
   ```js
   mongoose.connect('mongodb://localhost/imooc')
   ```
  4. 仅有删除部分的前端逻辑使用页面脚本--用于ajax请求,js文件地址:public/js/admin.js
  5. 其余均使用express将jade编译为html,由预设的路由发给前端,入口js配置如下
   * 依赖
     ```js
     var express = require('express');
     var path = require('path');
     var mongoose = require('mongoose');
     var Movie = require('./models/movie');
     var bodyParser = require('body-parser');
     var port = process.env.PORT || 3000
     var app = express();
     var _ =require('underscore');
     ```
   * 设置express.js所使用的render engine。
     ```js
     app.set('view engine', 'jade');
     ```

   * 设置view文件夹
     ```js
     app.set('views', __dirname + '/views');
     ```

   * 设置静态文件地址
     ```js
     app.use(express.static(path.join(__dirname,'public')));
     ```
   * 路由
     ```js
     //admin
     app.get('/admin', function(req, res) {
     	res.render('admin', {
     		title: 'imooc admin',
     		movie: MOVIE.admin
     	})
     })
     ```
  6. MongoDB操作
   * 建立models，schemas，document文件夹
   * 建立schema入口js：
   ```js
    //1-require mongoose
    //2-new一个mongoose.Schema的实例，成为所用到的构造函数，即为，增
    //3-实例的pre方法 - 需要给该方法写next()
    //4-实例的statics，用于查
    ```
    * 建立models入口js
    ```js
    //1-require mongoose
    //2-require schemas的模块
    //3-使用schema的模块创建mongoosemodel
    //4-打包为需要使用的模块export到module
    ```
    * 最后,在app.js里使用mongoose链接数据库,引入models,即可使用models里定义的方法
* 坑-tips
 1. bower的.bowerrc
  用于指定bower所安装的组件目录
  ```js
  {
       "directory":"public/libs"
  }
  ```
 2. bower的 init,用于生成bower.json
 3. npm 的 init,用于生成package.json

### 还不明确的地方
   1. mongoose的操作,static里return的各个方法的链式调用及参数
   2. mongoose调用构造函数创建数据对象的过程
