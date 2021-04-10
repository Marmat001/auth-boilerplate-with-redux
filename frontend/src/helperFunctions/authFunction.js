import axios from 'axios'

export const createUpdateUserInfo = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/create-update`,
    {},
    {
      headers: {
        token,
      },
    }
  )
}



export const getUserInfo = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/get-info`,
    {},
    {
      headers: {
        token,
      },
    }
  )
}