# express-mongodb-醒狮系统后台

## 介绍
本项目后端使用node + express + mongodb等技术

## 安装教程

1. npm install 安装依赖包
2. 安装mongodb数据库
3. 修改config目录下keys文件里的mongoURI。这个地址为mongodb的地址
4. npm run server 启动服务后端服务


## 使用的依赖包
1. nodemon 自动重启服务器
2. mongoose mongodb数据库包
3. body-parser post请求响应包
4. bcrypt  密码加密
5. gravatar 全球公认的头像
6. jsonwebtoken 登录之后返回一个token
7. passport-jwt passport   jsonwebtoken验证token的方式


## 主要实现的功能
### 详细请看document目录下的文档

#### 用户接口	

1. 用户的注册
2. 用户的登录
3. 显示所有用户
4. 修改用户信息
5. 删除用户信息

####  游戏接口

1. 游戏基础信息列表
2. 新增游戏
3. 修改游戏基础信息
4. 删除某一个游戏
5. 获取游戏的下载信息
6. 更改游戏的下载信息
7. 获取游戏的更新日志
8. 添加游戏的更新日志
9. 修改游戏的更新日志
10. 删除游戏的某条更新日志

## 目录解读
![](F:\WebDocument\ancestors\manage-server\img\list.jpg)

### config目录下保存了一些配置文件

####  keys.js 数据库的地址

#### token验证

### models数据库的模型

### routers路由地址

### app.js项目启动

 

## 提交版本

### v1.0
#### 用户接口
1. 用户的注册
2. 用户的登录
3. 显示所有用户
4. 修改用户信息
5. 删除用户信息
#### 游戏接口
1. 游戏基础信息列表
2. 新增游戏
3. 修改游戏基础信息
4. 删除某一个游戏
5. 获取游戏的下载信息
6. 更改游戏的下载信息
7. 获取游戏的更新日志
8. 添加游戏的更新日志
9. 修改游戏的更新日志
10. 删除游戏的某条更新日志


#### 有问题反馈 在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

1. 邮件: 751135385@qq.com
2. QQ: 751135385
