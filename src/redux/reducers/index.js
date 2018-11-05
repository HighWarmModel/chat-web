// 合并所有reducer  并且返回
import { combineReducers } from 'redux'

import { reduxUser } from './user.redux'
import { reduxUserList } from './user.list.redux'
import { chat } from './chat.list.redux'

export default combineReducers({reduxUser, reduxUserList ,chat})