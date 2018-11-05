const express = require('express')
const path = require('path') // 测试
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const glob = require('glob') // 测试

const util = require('util')
// 类似于mysql的表 mongo里有文档、字段的概念
const app = express()
// work with express
const http = require('http').Server(app)
const io = require('socket.io')(http)

const userRouter = require('./user')
const webSocket = require('./socket')
function getEntry () {
  let globPath = '../src/container/**/*.js'
  // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
  let pathDir = '../src(\\/|\\\\)container(\\/|\\\\)(.*?)'
  let files = glob.sync(globPath)
  console.log(files)
  let dirname, entries = []
  for (let i = 0; i < files.length; i++) {
    dirname = path.dirname(files[i])
    entries.push(dirname.replace(new RegExp(pathDir), '$3'))
  }
  return entries
}
console.log(getEntry())
// console.log(path.dirname(glob.sync('src/container/**/*.js')[0])) // 测试
app.all('*',function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Headers', '*')
  // // res.header("Access-Control-Allow-Credentials",true); //带cookies
  // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

  // res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // 跨域cookie需要知道域名
  // res.header("Access-Control-Allow-Credentials", true); // 跨域cookie需要这个请求头
  // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Origin", req.headers.origin); // 可以在任何域名下使用cookie
  res.header("Access-Control-Allow-Credentials", true); // 跨域cookie需要这个请求头
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
　next()
})
app.use(cookieParser(util.secret))
app.use(bodyParser())
app.use('/user', userRouter)
webSocket(io)
// app.listen(9093, function () {
//   console.log('Nod app start at port 9093')
// })5b6107881a190f4bba90aa6c
http.listen(9093, function () {
  console.log('Nod app start at port 9093')
})