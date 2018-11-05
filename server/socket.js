const util = require('util')
const cookies = require('cookie')
const cookieParser = require('cookie-parser')

const model = require('./model')
const Chat = model.getModel('chat')
function webSocket (io) {
io.on('connection', function (socket) {
  //  const { userid } = socket.cookie
  //  console.log(userid)
  socket.on('sendmsg', function (data) {
    let cook = cookies.parse(socket.handshake.headers.cookie)
    if (!cook) {

    }
    let from = cookieParser.JSONCookie(cookieParser.signedCookie(cook.userid, util.secret))
    const {to, msg} = data
    const chatid = [from, to].join('_')
    Chat.create({chatid, from, to, content: msg,}, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, d._doc))
    })
  })
})
}
module.exports = webSocket