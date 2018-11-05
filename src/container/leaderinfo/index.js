import React from 'react'
import { NavBar, InputItem, TextareaItem, WhiteSpace, Button, List, Picker, DatePicker, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import QueueAnim from 'rc-queue-anim'
// import classNames from 'classnames'
// import { CSSTransitionGroup } from 'react-transition-group'


// 选择头像组件
import AvatarSelector from '../../component/avatar-selector'
import { reduxUpdateInfoAsync } from '../../redux/reducers/user.redux'
import './index.styl'
// 完善领导页面
class LeaderInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      info: { // 个人信息
        avatar: '', // 头像
        name: '', // 姓名
        job: '', // 岗位
        company: '', // 在职公司
        salary: '', // 月薪
        birth: '', // 出生日期
        sex: [], // 性别
        desc: '' // 个人简介
      },
      errInfo: {
        avatar: false, // 头像
        name: false, // 姓名
        job: false, // 岗位
        company: false, // 在职公司
        salary: false, // 月薪
        birth: false, // 出生日期
        sex: false, // 性别
        desc: false // 个人简介
      },
      show: false,
      sexVisible: false // 性别picker
    }
    this.updateUserInfo = this.updateUserInfo.bind(this)
  }
  // 错误点击提示
  errorFunc (key) {
    if (key === 'name') {
      Toast.info('姓名不能为空!!!', 1);
    }
  }
  //把值存入state中
  changeFunc (key, val) {
    if (key === 'name' && val === '') {
      this.setState({
        errInfo: {...this.state.errInfo, name: true}
      })
    } else if (key === 'name') {
      this.setState({
        errInfo: {...this.state.errInfo, name: false}
      })
    }
    this.setState({
      info: {...this.state.info, [key]: val}
    })
  }
  // 更新信息
  updateUserInfo () {
    if (this.state.info.avatar === '') {
      return Toast.fail('请替换头像', 2)
    }
    if (this.state.info.name === '') {
      return Toast.fail('姓名不能为空', 2)
    }
    if (this.state.info.birth === '') {
      return Toast.fail('请选择出生日期', 2)
    }
    if (this.state.info.job === '') {
      return Toast.fail('岗位不能为空', 2)
    }
    if (this.state.info.company === '') {
      return Toast.fail('在职公司不能为空', 2)
    }
    if (this.state.info.salary === '') {
      return Toast.fail('月薪不能为空', 2)
    }
    this.props.reduxUpdateInfoAsync(this.state.info)
  }
  // 选择头像
  handleGetAvatar (avatar) {
    this.setState({
      info: {...this.state.info, avatar}
    })
  }
  render () {
    const { name, job, company, salary, birth, sex, desc } = this.state.info;
    const sexData = [
      { value: 1, label: '男性' },
      { value: 2, label: '女性' },
      { value: 3, label: '其它' },
    ]
    const date = new Date()
    date.setFullYear(date.getFullYear()-100)
    const path = this.props.location.pathname
    console.log(this.props)
    const redirect = this.props.reduxUser.redirectTo
    return (
      <div className='container leader-info'>
      {redirect && redirect !== path ? <Redirect to={redirect}/> : null}
        <NavBar mode="dark">信息完善</NavBar>
        <AvatarSelector defaultAvatar={this.state.info.avatar}  handleGetAvatar={(avatar) => {this.handleGetAvatar(avatar)}} />
        <List>
          <InputItem className='hhf-info-right-input' value={name} placeholder='输入姓名' maxLength={6} onChange={v => this.changeFunc('name', v)} error={this.state.errInfo.name} onErrorClick={() => this.errorFunc('name')}>姓　　名</InputItem>
          <Picker
            data={sexData}
            cols={1}
            value={[sex]}
            onChange={v => this.changeFunc('sex', v[0])}
            // onOk={() => this.setState({ sexVisible: false })}
            // onDismiss={() => this.setState({ sexVisible: false })}
          >
            <List.Item arrow="horizontal">
              性　　别
            </List.Item>
          </Picker>
          <DatePicker
          minDate={date}
          maxDate={new Date()}
          mode="date"
          title="选择日期"
          extra="选择日期"
          value={(!birth ? '' : new Date(birth))}
          format={val => val.toLocaleDateString()}
          onChange={birth => {this.changeFunc('birth', birth.toLocaleDateString())}}
        >
          <List.Item arrow="horizontal">出生日期</List.Item>
        </DatePicker>
          <InputItem className='hhf-info-right-input' value={job} placeholder='输入岗位' maxLength={20} onChange={v => this.changeFunc('job', v)}>岗　　位</InputItem>
          <InputItem className='hhf-info-right-input' value={company} placeholder='输入在职公司' maxLength={20} onChange={v => this.changeFunc('company', v)}>在职公司</InputItem>
          <InputItem type='money' placeholder='输入月薪' value={salary} maxLength={10} onChange={v => this.changeFunc('salary', v)}>月　　薪</InputItem>
          <TextareaItem
              title='个人简介'
              value={desc || '错误的人什么都没有留下，只教会了我们惩罚对的人的方法'}
              rows={5}
              count={100}
              onChange={v => this.changeFunc('desc', v)}
          />
        </List>
        <WhiteSpace />
        <Button type='primary' onClick={this.updateUserInfo}>保存</Button>
      </div>
    )
  }
}

LeaderInfo = connect(state => state, { reduxUpdateInfoAsync })(LeaderInfo)
export default LeaderInfo