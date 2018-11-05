import React from 'react'
import { withRouter } from 'react-router-dom' //可以是非页面级组件操作路由
import { connect } from 'react-redux'

// 获取用户信息
import { reduxLoadDataSync } from '../../redux/reducers/user.redux'
import { $http, resIF } from '../../http/index'
class AuthRoute extends React.Component {
  componentWillMount () {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    // 获取用户信息
    $http.get(resIF.baseURL,resIF.userINFO)
    .then(data => {
        if (data && data.code === 1) {
          // 有登录信息
          this.props.reduxLoadDataSync(data.data)
        } else {
          this.props.history.push('/login')
        }
    })
    // 是否登录

    // 现在的url地址 eg login是不需要跳转
    // 用户的type 身份是boss还是牛人
    // 用户是否完善信息 （选择头像 个人简介）
  }
  render () {
    return (
      <div></div>
    )
  }
}
AuthRoute = withRouter(AuthRoute)
AuthRoute = connect(state => state, { reduxLoadDataSync })(AuthRoute)
export default AuthRoute