const hhf = {
  ERROR_MSG: Symbol(),
  AUTH_SUCCESS: Symbol(),
  LOAD_DATA: Symbol(),
  CLEAR_DATA: Symbol(), // 退出登录
  PULL_UP_LOADING_USER_LIST: Symbol(), // 上拉记载
  DROP_DOWN_REFRESH_USER_LIST: Symbol(), // 下拉刷新
  MSG_LIST: Symbol(), // 获取聊天列表
  MSG_RECV: Symbol(), // 读取信息
  MSG_READ: Symbol() // 标识已读
}
export default hhf