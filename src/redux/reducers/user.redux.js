import classify from '../type/index'
import { $http, resIF } from '../../http/index'
import { utilGetRedirectPath } from '../../util/index'

const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  user: '',
  type: ''
}
// reducer
export function reduxUser (state = initState, action) {
  switch (action.type) {
    case classify.AUTH_SUCCESS:
      return {...state, msg: '',redirectTo: utilGetRedirectPath(action.payload), isAuth: true, ...action.payload}
    case classify.LOAD_DATA:
      return {...state, ...action.payload}
    case classify.ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case classify.CLEAR_DATA:
      return {...initState}
    default:
      return state
  }
}

// 用户信息注册登录更新成功
function reduxAuthSuccessSync (data) {
  return { type: classify.AUTH_SUCCESS, payload: data }
}

// 返回失败内容
function reduxErrorMsgSync (msg) {
  return {msg, type: classify.ERROR_MSG}
}

// 用户信息放在redux中
export function reduxLoadDataSync (userinfo) {
  return { type: classify.LOAD_DATA, payload: userinfo}
}
// 退出登录清除信息
export function reduxClearUserSync () {
  return {type: classify.CLEAR_DATA}
}
//用户信息更新成功
export function reduxUpdateInfoAsync (info) {
  return dispatch => {
    $http.post(resIF.baseURL, resIF.updateUserInfo, info, 2)
    .then(data => {
        if (data && data.code === 1) {
          dispatch(reduxAuthSuccessSync(data.data))
        } 
        else {
          dispatch(reduxErrorMsgSync(data.msg))
        }
    })
  }
}

// 登录
export function reduxLoginAsync({user, pwd}) {
  if (!user || !pwd) {
    return reduxErrorMsgSync('用户密码必须输入')
  }
  return dispatch => {
    $http.post(resIF.baseURL, resIF.login, {user, pwd}, 2)
      .then(data => {
          if (data && data.code === 1) {
            //dispatch(registerSuccess({user, pwd}))
            dispatch(reduxAuthSuccessSync(data.data))
          } else {
            dispatch(reduxErrorMsgSync(data.msg))
          }
      })
  }
}

// 注册
export function reduxRegisterAsync ({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !type) {
    return reduxErrorMsgSync('用户名或密码不能为空')
  }
  if (pwd !== repeatpwd) {
    return reduxErrorMsgSync('密码和确认密码不同')
  }
  return dispatch => {
    $http.post(resIF.baseURL, resIF.register, {user, pwd, type}, 2)
      .then(data => {
          if (data && data.code === 1) {
            dispatch(reduxAuthSuccessSync({user, pwd, type}))
          } else {
            dispatch(reduxErrorMsgSync(data.msg))
          }
      })
  }
}