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

export const getAdminInfo = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/admin/get-info`,
    {},
    {
      headers: {
        token,
      },
    }
  )
}

export const createOrder = async (token, stripeResponse, slug) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse, slug },
    {
      headers: {
        token,
      },
    }
  )

export const getOrders = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      token,
    },
  })

export const getWishlist = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      token,
    },
  })

export const removeTourFromWishlist = async (tourId, token) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${tourId}`,
    {},
    {
      headers: {
        token,
      },
    }
  )

export const addTourToWishlist = async (tourId, token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { tourId },
    {
      headers: {
        token,
      },
    }
  )
