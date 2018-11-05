import React from 'react'
import { NavBar, List, InputItem } from 'antd-mobile'
// import io from 'socket.io-client'
import { connect } from 'react-redux'

import CommonClass from '../../util/CommonClass'
import { getMsgList, sendMsg } from '../../redux/reducers/chat.list.redux'
class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      socket: null,
      msg: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount () {
    this.props.getMsgList()
    // this.setState({
    //   socket: io('ws://localhost:9093')
    // },() => {
    //   this.state.socket.on('recvmsg', (data) => {
    //     this.setState({
    //       msg:[...this.state.msg, data.text]
    //     })
    //   })
    // })
  }
  handleSubmit () {
    // const to = this.props.user
    // this.props.getMsgList
    const to = CommonClass.getSearchString(this.props.location.search, 'id')
    const msg = this.state.text
    this.props.sendMsg({to, msg})
    this.setState({
      text: ''
    })
  }
  render () {
    console.log()
    return (
      <div>
        <NavBar className='fixed-header' mode='dark'>{this.props.match.params.user}</NavBar>
        {this.state.msg.map((v,i) => {
          return <p key={i}>{v}</p>
        })}
        <List>
          <InputItem
            placeholder='请输入'
            value={this.state.text}
            onChange={v => {this.setState({text: v})}}
            extra={<span
              onClick={() => this.handleSubmit()}
            >发送</span>}
          ></InputItem>
        </List>
      </div>
    )
  }
}
export default connect(state => state, {getMsgList, sendMsg})(Chat)