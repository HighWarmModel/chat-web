import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { reduxLoginAsync } from '../../redux/reducers/user.redux'
// 高阶组件
import { FormInput } from '../../component/high-order-component'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.registerFunc = this.registerFunc.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  registerFunc () {
    this.props.history.push('/register')
  }
  // 点击登录
  handleLogin () {
     this.props.reduxLoginAsync(this.props.state)
  }
  render () {
    return (
      <div>
      {this.props.reduxUser.redirectTo ? <Redirect to={this.props.reduxUser.redirectTo}/> : null}
        <h2 className=''>登录</h2>
        <WingBlank>
        <List>
            {this.props.reduxUser.msg ? <p className='error-msg'>{this.props.reduxUser.msg}</p> : ''}
          <InputItem type='text' onChange={v => {this.props.handleChange('user', v)}}>用户名</InputItem>
          <InputItem onChange={v => {this.props.handleChange('pwd', v)}} type="password">密码</InputItem>
          <input type='password' className='hhf-content-window-outside' onFocus={(e) => {e.target.blur()}} />
        </List>
        <WhiteSpace />
        <Button type='primary' onClick={this.handleLogin}>登录</Button>
        <WhiteSpace />
        <Button onClick={this.registerFunc} type='primary'>还没有账号？去注册</Button>
        </WingBlank>
      </div>
    )
  }
}
Login = connect(state => state, { reduxLoginAsync })(FormInput(Login))
export default Login