import { combineReducers } from 'redux'
import { couponReducer } from './couponReducers'
import { searchFilterReducer } from './searchReducers'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  user: userReducer,
  search: searchFilterReducer,
  coupon: couponReducer,
})
