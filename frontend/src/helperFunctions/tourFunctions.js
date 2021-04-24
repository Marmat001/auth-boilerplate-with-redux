import axios from 'axios'

export const getAllTours = async (amount) =>
  await axios.get(`${process.env.REACT_APP_API}/tours/${amount}`)

export const getTour = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/tour/${slug}`)

export const removeTours = async (slug, token) =>
  await axios.delete(`${process.env.REACT_APP_API}/tour/${slug}`, {
    headers: {
      token,
    },
  })

export const updateTour = async (slug, tour, token) =>
  await axios.put(`${process.env.REACT_APP_API}/tour/${slug}`, tour, {
    headers: {
      token,
    },
  })

export const addTour = async (tour, token) =>
  await axios.post(`${process.env.REACT_APP_API}/tour`, tour, {
    headers: {
      token,
    },
  })

export const getTours = async (order, page, sort) =>
  await axios.post(`${process.env.REACT_APP_API}/tours`, {
    order,
    page,
    sort,
  })
  


  export const toursAmount = async () => 
    await axios.get(`${process.env.REACT_APP_API}/tours/count`)
  




  export const getRelatedTours = async (id) => 
  await axios.get(`${process.env.REACT_APP_API}/tour/related/${id}`)