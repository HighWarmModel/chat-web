import classify from '../type'
const initState = {
  userList: [],
  currentPage: 0,
  pageNum: 0,
}
export function reduxUserList (state = initState, action) {
  switch (action.type) {
    case classify.PULL_UP_LOADING_USER_LIST: 
    return {...state, ...action.payload}
    case classify.DROP_DOWN_REFRESH_USER_LIST:
    return {...action.payload} 
    case classify.CLEAR_DATA:
    return {...initState} 
    default:
    return state
  }
}
// 上拉加载
function reduxGetUserListPullSync (data) {
  return {type: classify.PULL_UP_LOADING_USER_LIST, payload: data}
}
// 下拉刷新
function reduxGetUserListDropSync (data) {
  return {type: classify.DROP_DOWN_REFRESH_USER_LIST, payload: data}
}
// 退出登录清除数据
export function reduxClearUserListSync () {
  return {type: classify.CLEAR_DATA}
}
// 加载失败
// function reduxGetUserListFailSync (data) {
//   return {type: classify.ERROR_MSG, payload: data}
// }
// 上拉加载
export function reduxGetUserListAsync (data) {
  return dispatch => {
    if (data.type === 'pull') {
      dispatch(reduxGetUserListPullSync(data))
    } else {
      dispatch(reduxGetUserListDropSync(data))
    }
  }
}
// 下拉刷新