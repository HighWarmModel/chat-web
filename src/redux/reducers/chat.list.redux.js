import io from 'socket.io-client'

import classify from '../type/index'
import { $http, resIF } from '../../http/index'
const socket = io('ws://localhost:9093')
const initState = {
  chat_msg: [],
  unread: 0
}
export function chat (state = initState, action) {
  switch (action.type) {
    case classify.MSG_LIST:   // 获取聊天列表
      return {...state, chat_msg: action.payload, unread: action.payload.filter(v => !v.read).length}
    case classify.MSG_RECV:  // 读取信息
    return {...state, chat_msg: [...state.chat_msg, action.payload]}
    case classify.MSG_READ: // 标识已读
    default:
      return state
  }
}
function msgList (msgs) {
  return {type: classify.MSG_LIST, payload: msgs}
}

function msgRecv (msg) {
  return {type: classify.MSG_RECV, payload: msg}
}
// 接收消息 socket
export function recvMsg () {
  return dispatch => {
    socket.on('recvmsg', function(data) {
      console.log('recvmsg', data)
      dispatch(msgRecv(data))
    })
  }
}
// 发送消息 socket
export function sendMsg ({to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', {to, msg})
  }
}
// 获取消息列表 axios
export function getMsgList () {
  return dispatch => {
    $http.post(resIF.baseURL, resIF.getMsgList)
      .then(data => {
        if (data && data.code === 1) {
          dispatch(msgList(data.data))
        }
      })
  }
}