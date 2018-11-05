const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/chat'
mongoose.connect(DB_URL, {useNewUrlParser:true})
// 标识连接成功
mongoose.connection.on('connected', function () {
  console.log('mongo connect success')
})
const models = {
  // 用户信息
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},
    // 头像
    'avatar': {type: String},
    // 姓名
    'name': {type: String},
    // 个人简介
    'desc': {type: String},
    // 性别
    'sex': {type: Number},
    // 出生日期
    'birth': {type: Date},
    // 岗位
    'job': {type: String},
    // 在职公司
    'company': {type: String},
    // 月薪
    'salary': {type: String},
    'createDate': {type: Date, default: Date.now},
  },
  chat: {
    'chatid': {type: String, reuqire: true, },
    'read': {type: Boolean, default: false},
    'from': {type: String, require: true},
    'to': {type: String, require: true},
    'content': {type: String, require: true,default: ''},
    'create_time': {type: Date, default: Date.now}
  }
}
for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}
// 类似于mysql的表 mongo里有文档、字段的概念
// const User = mongoose.model('user', new mongoose.Schema({
//   user: {type: String, require: true},
//   age: {type: Number, require: true}
// }))
// 新增数据
// User.create({
//     'user': '海少',
//     'age': 15
//   },function(err, doc){
//       if (!err) {
//           console.log(doc)
//         } else {
//             console.log(err)
//           }
//         })
// 更新数据
// User.update({
//   '_id': '5b4c3430172d3b09b0fbb131'
// },{'$set': {'age': '25'}}, function(err, doc) {
//   console.log(doc)
// })
// 删除数据
// User.remove({__v:0}, function(err, doc) {
//   console.log(doc)
// })
// mongoose.model('user').remove({__v:0}, function(err, doc) {
//   console.log(doc)
// })
// module.exports = User