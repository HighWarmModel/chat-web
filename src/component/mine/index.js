import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
import {reduxClearUserSync} from '../../redux/reducers/user.redux'
import {reduxClearUserListSync} from '../../redux/reducers/user.list.redux'
import Cookies from 'browser-cookies'
class Mine extends React.Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout() {
    Modal.alert('退出', '确定退出登录？？？', [
      { text: '取消'},
      { text: '确定', onPress: () => {
        this.props.reduxClearUserSync()
        this.props.reduxClearUserListSync()
        Cookies.erase('userid')
        this.props.history.push('/login')
      }},
    ])
    
  }
  render () {
    const props = this.props
    const myImg = (src) => <img style={{maxWidth:'100%'}} src={src} alt='' />
    return props.name ? (
      <div>
        <Result 
          img={myImg(require(`../../assets/img/${props.avatar}.png`))}
          // img={<img src={require(`../../assets/img/${props.avatar}.png`)} alt='' />}
          title={props.name}
          message={<div><span>{
            props.sex === 1 ?
             '男' : 
             (props.sex === 2 ? 
              '女' : '未知')
            }</span><span>{props.age}</span></div>}
        />
        <List renderHeader={() => '个人信息'} className="my-list">
          <List.Item extra={props.company} arrow="horizontal" onClick={() => {}}>company</List.Item>
          <List.Item extra={props.job} arrow="horizontal" onClick={() => {}}>job</List.Item>
          <List.Item extra={props.type} arrow="horizontal" onClick={() => {}}>type</List.Item>
          <List.Item extra={props.salary} arrow="horizontal" onClick={() => {}}>salary</List.Item>
        </List>
        <List renderHeader={() => '简介'}>
        <List.Item arrow="empty" className="spe" wrap>{props.desc ? props.desc : '无简介'}</List.Item>
        </List>
        <WhiteSpace />
        <List>
          <List.Item onClick={this.logout} arrow="horizontal">退出登录</List.Item>
        </List>
      </div>
    ) : null
  }
}
export default connect(state => state.reduxUser, {reduxClearUserSync, reduxClearUserListSync})(Mine)