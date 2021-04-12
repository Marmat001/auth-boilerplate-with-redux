import React, { useState } from 'react'
import { Menu } from 'antd'
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const { SubMenu, Item } = Menu

const Navigation = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [current, setCurrent] = useState('home')

  const userInfo = useSelector((state) => state.user)

  const handleClick = (e) => {
    setCurrent(e.key)
  }

  const logoutHandler = () => {
    firebase.auth().signOut()

    dispatch({
      type: 'LOGOUT_USER',
      payload: null,
    })

    history.push('/login')
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<HomeOutlined />}>
        <Link to='/'>Home</Link>
      </Item>

      {!userInfo && (
        <Item key='register' icon={<UserAddOutlined />} className='float-right'>
          <Link to='/register'>Register</Link>
        </Item>
      )}

      {!userInfo && (
        <Item key='login' icon={<UserOutlined />} className='float-right'>
          <Link to='/login'>Log In</Link>
        </Item>
      )}

      {userInfo && (
        <SubMenu
          key='SubMenu'
          icon={<AppstoreOutlined />}
          title={userInfo.email && userInfo.email.split('@')[0]}
          className='float-right'
        >
          {userInfo && userInfo.role === 'adventurer' && (
            <Item>
              <Link to='/user/dashboard'>Dashboard</Link>
            </Item>
          )}

          {userInfo && userInfo.role === 'admin' && (
            <Item>
              <Link to='/admin/dashboard'>Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logoutHandler}>
            Log Out
          </Item>
        </SubMenu>
      )}
    </Menu>
  )
}

export default Navigation
