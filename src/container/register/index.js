import React from 'react'
import { List, Radio, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { reduxRegisterAsync } from '../../redux/reducers/user.redux.js'
import { FormInput } from '../../component/high-order-component'
class Register extends React.Component {
  constructor (props) {
    super(props)
    this.loginFunc = this.loginFunc.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount () {
    this.props.handleChange('type', 'clerk')
  }
  // 去登录
  loginFunc () {
    this.props.history.push('/login')
  }
  // 点击注册
  handleRegister () {
    this.props.reduxRegisterAsync(this.props.state)
  }
  render () {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.reduxUser.redirectTo ? <Redirect to={this.props.reduxUser.redirectTo}/> : null}
        <h2>注册</h2>
        <WingBlank>
          <List>
            {this.props.reduxUser.msg ? <p className='error-msg'>{this.reduxUser.user.msg}</p> : ''}
            <InputItem
              onChange={v => this.props.handleChange('user', v)}
            >用户名</InputItem>
            <InputItem
              onChange={v => this.props.handleChange('pwd', v)}
              type="password"
            >密码</InputItem>
            <InputItem
              onChange={v => this.props.handleChange('repeatpwd', v)}
              type="password"
            >确认密码</InputItem>
          </List>
          <WhiteSpace />
          <List>
            <RadioItem
             onChange={() => this.props.handleChange('type', 'clerk')}
             checked={this.props.state.type === 'clerk'}>职工</RadioItem>
            <RadioItem 
             onChange={() => this.props.handleChange('type', 'leader')}
            checked={this.props.state.type === 'leader'}>领导</RadioItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
          <WhiteSpace />
          <Button onClick={this.loginFunc} type='primary'>已有账号？去登录</Button>
        </WingBlank>
      </div>
    )
  }
}
Register = connect(state => state, {reduxRegisterAsync})(FormInput(Register))
export default Register