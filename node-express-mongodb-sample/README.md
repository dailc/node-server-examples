# node-express-sample

node.js的express + mongodb示例

- gulp + eslint检查代码

- 开启公告可访问资源

- 配置跨域

- 简单的Get和Post请求示例

- 代码划分模块

- supervisor自动监听修改

- 新增一个接口可以mongodb数据存储（需要本地先安装）

- mongoose操作mongodb

## 如何服务器端`mongodb`

cd到安装目录，如`E:\nodeJs\mongodb\bin`，键入命令

```js
mongod --dbpath "E:\nodeJs\mongodb\data"  --logpath E:\nodeJs\mongodb\log\MongoDB.log --serviceName "MongoDB" --install

net start mongodb 
```

自动注册成服务并启动

## monogodb创建一个测试数据库

代码连接时会自动创建（前提是mongodb启动）

## 如何查询mongodb数据库

```js
// 显示所有库
show dbs

// 查看当前连接的库
db

// 使用某个库
use xxdb

// 显示库中有哪些集合
show collections

// 显示集合中所有元素
db.collections名.find()

// 删除当前数据库
db.dropDatabase()

// 打开帮助
help
db.collections名.help()
```

另外，记得加上unique防止重复

## mongoose设置索引与唯一

```js
userScheMa.index({
    // 1和-1分别表示升序索引和降序索引
    name: 1,
});

userScheMa.path('name').index({
    // 设置唯一
    unique: true,
});
```

设置唯一时，确保数据库中没有重复元素，否则请删除后重新创建（或删除重复数据）