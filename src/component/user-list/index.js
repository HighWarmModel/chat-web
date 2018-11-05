import React from 'react'
import {connect} from 'react-redux'
import { Card, WingBlank, WhiteSpace, PullToRefresh } from 'antd-mobile'

import { $http, resIF } from '../../http/index'
import {reduxGetUserListAsync} from '../../redux/reducers/user.list.redux'
import './index.styl'
class UserList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      direction: true,
      refreshing: true
    }
    this.downRefreshFunc = this.downRefreshFunc.bind(this)
  }
  componentDidMount () {
    if (this.props.currentPage === 0) {
      this.getListFunc('drop', 1).then(res => {
        if (res.code === 1) {
          let data = res
          data = Object.assign({},data,{type: 'prop'})
          this.props.reduxGetUserListAsync(data)
        }
      })
    }
  }
  /**
   * 
   * @param {*} state 类型
   * @param {*} type 加载动画
   */
  async getListFunc (state,type) {
   return $http.post(resIF.baseURL, resIF.userList, {
      currentPage: state === 'drop' ? 1 : this.props.currentPage + 1, // 当前页
    }, type)
    // .then(res => {
    //   if (res.code === 0) {
    //     let pagedata = {
    //       userList: res.userList,
    //       pageNum: res.pageNum,
    //       currentPage: res.currentPage + 1
    //     }
    //     if (data.type === 'pull') {
    //       // 上拉
    //       dispatch(reduxGetUserListPullSync(pagedata))
    //     } else {
    //       // 下拉
    //       dispatch(reduxGetUserListDropSync(pagedata))
    //     }
    //   } else {
    //     Toast.fail(res.msg, 1)
    //   }
    // }).catch(() => {
      
    // })
  }
  downRefreshFunc (type) {
    this.setState({refreshing: true})
    this.getListFunc('drop', 0).then(
      res => {
        if (res.code === 1) {
          let pagedata = {
                  userList: res.userList,
                  pageNum: res.pageNum,
                  currentPage: res.currentPage + 1,
                  type
                }
         this.props.reduxGetUserListAsync(pagedata)
        }
        this.setState({refreshing: false})
      },
      err => {
        this.setState({refreshing: false})
      }
    )
  }
  handleClick (v) {
    this.props.history.push(`/chat/${v.user}?id=${v._id}`)
  }
  render () {
    return (
      <WingBlank className='user-list' size="lg">
      <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: '100%',
          overflow: 'auto',
        }}
        indicator={this.state.direction ? {} : { deactivate: '下拉可以刷新' }}
        direction={this.state.direction ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={() => {this.downRefreshFunc('drop')}}
      >
      {this.props.userList.map((v, i) => (
        <div 
          key={i} 
          onClick={() => this.handleClick(v)}
        >
          <WhiteSpace size="lg" />
          <Card>
            <Card.Header
              title={v.name}
              thumb={require(`../../assets/img/${v.avatar}.png`)}
              thumbStyle={{width: '1rem', height: '1rem'}}
              extra={<span>{v.sex === 1 ? '男' : '女'}</span>}
            />
            <Card.Body>
              <div>{v.desc ? v.desc : '错误的人什么都没有留下，只教会了我们惩罚对的人的方法'}</div>
            </Card.Body>
            {/* <Card.Footer content={v.sex === 1 ? '男' : '女'} extra={<div>{v.company}</div>} /> */}
          </Card>
        </div>
      ))}
    <WhiteSpace size="lg" />
    </PullToRefresh>
  </WingBlank>
    )
  }
}
export default connect(state => state.reduxUserList, {reduxGetUserListAsync})(UserList)