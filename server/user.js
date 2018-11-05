const express = require('express')

const model = require('./model')
const util = require('util')
const Router = express.Router()

const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd': 0, '__v': 0}
Router.get('/list', function (req, res) {
  User.find({}, function (err, doc) {
        res.json(doc)
      })
})
Router.get('/info', function (req, res) {
  const { userid } = req.signedCookies
  if (!userid) {
    return res.json({code: 2})
  }
  User.findOne({_id: userid},{..._filter, '_id': 0}, function(err, doc) {
    if (err) {
      return res.json({code: 3, msg: '服务端出问题了'})
    }
    if (doc) {
      const data = Object.assign({}, doc._doc)
      // console.log('data:'+data);
      // console.log('getage:'+getAge(data.birth) )
    data.age = data.birth ? util.getAge(data.birth) : '' // 有问题
    delete data.birth
    delete data.createDate
    // console.log(data)
      return res.json({code: 1, data})
    } else {
      return res.json({code: 4, data: {msg: '没有该用户'}})
    }
  })
  
  // 查找mongodb 用户信息
  // User.find({}, function (err, doc) {
  //   res.json(doc)
  // })
})
// User.remove({},function(e, d) {})
// 注册
Router.post('/register', function (req, res) {
  const {user, pwd, type} = req.body
  // 首先查询一次 是否存在该用户名
  User.findOne({user}, function (err, doc) {
    if (doc) {
      return res.json({code: 2, msg: '该用户名已被注册'})
    } 
    // 生成数据的时候获得_id
    // const userModel = new User({user, type, pwd: md5Pwd(pwd)})
    // userModel.save(function (e, d) {
    //   if (e) {
    //     return res.json({code: 4,msg: '服务端出错了'})
    //   } 
    //   const {user, type, _id} = d
    //   res.cookie('userid', _id, {expires: new Date(Date.now() + 900000), domain:'localhost'})
    //   return res.json({code: 1, data: {user, type}})
    // })
      User.create({user, pwd: util.md5Pwd(pwd), type}, function(e, d) {
        if (e) {
          return res.json({code: 3, msg: '服务端出错了'})
        }
        return res.json({code: 1, msg: '注册成功'})
      })
  })
})

// 登录
Router.post('/login', function (req, res) {
  const {user, pwd} = req.body
  // 首先查询一次 是否存在该用户名
  User.findOne({user, pwd: util.md5Pwd(pwd)}, _filter, function (err, doc) {
    if (!doc) {
      return res.json({code: 2, msg: '用户名或密码错误'})
    }
      res.cookie('userid', doc._id, {expires: new Date(Date.now() + 900000),signed: true})
      // delete doc._id
      // let obj = Object.getOwnPropertyDescriptors(doc)
      // console.log(doc)
      // console.log(obj)
      let data = Object.assign({}, doc._doc) // 
      // let data = JSON.parse(JSON.stringify(doc))
      data.age = data.birth ? util.getAge(data.birth) : ''
      delete data._id
      delete data.birth
      return res.json({code: 1, msg: '登录成功', data})
  })
})

// 更新用户
Router.post('/update', function (req, res) {
  const { userid } = req.signedCookies
  if (!userid) {
    return res.json({code: 2, msg: '请登录后操作！'})
  }
  const { body } = req
  User.findByIdAndUpdate(userid, body, function(err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    data.age = data.birth ? util.getAge(data.birth) : ''
    delete data.birth
    return res.json({code: 1, data, msg: '保存成功'})
  })
})
// 获取用户列表
Router.post('/list', function (req, res) {
  const currentPage = req.body.currentPage - 0 // 当前页
  const num = 10 // 一页十条
  User.find({avatar: /\d/g}, {..._filter, 'createDate': 0}).sort({createDate: -1}).exec(function(err, doc) {
    if (err) {
      return res.json({code: 3, msg: '服务端出错了'})
    }
    const len = doc.length
    let pageNum = 0 // 总页数
    let data = []  // 索引出来的数据
    if (len === 0) {
      return res.json({code: 0, userList: data, currentPage, pageNum})
    }
    if (len % 10 === 0) {
      pageNum = len / 10
      data = doc.slice((currentPage - 1) * num, currentPage * num)
    } else {
      pageNum = Math.ceil(len / 10)
      if (currentPage === pageNum) {
        data = doc.slice((currentPage - 1) * num)
      } else {
        data = doc.slice((currentPage - 1) * num, currentPage * num)
      }
    }
    data.map((v, i) => {
      v.age = v.birth ? util.getAge(v.birth) : ''
      delete v.birth
      return v
    })
    return res.json({code: 1, userList: data, currentPage, pageNum})
  })
})
// 获取聊天信息列表
Router.post('/getmsglist', function (req, res) {

  // Cookies that have not been signed
  // console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  const { userid } = req.signedCookies
  if (!userid) {
    return res.json({code: 2, msg: '请登录后操作！'})
  }
  const { body } = req
  // 多个条件查询
  // {'$or': [{from: userid, to: body.user}]}
  Chat.find({'$or': [{from: userid, to: body.user}]}, function (err, doc) {
    return res.json({code: 1, data: doc})
  })
})
// Router.get('/list', function (req, res) {
//   User.find({}, function (err, doc) {
//     res.json(doc)
//   })
// })
module.exports = Router