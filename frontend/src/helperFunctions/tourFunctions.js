import axios from 'axios'

export const getAllTours = async (amount) =>
  await axios.get(`${process.env.REACT_APP_API}/tours/${amount}`)

// export const getContinent = async (slug) =>
//   await axios.get(`${process.env.REACT_APP_API}/continent/${slug}`)

// export const removeContinent = async (slug, token) =>
//   await axios.delete(`${process.env.REACT_APP_API}/continent/${slug}`, {
//     headers: {
//       token,
//     },
//   })

// export const updateContinent = async (slug, continent, token) =>
//   await axios.put(`${process.env.REACT_APP_API}/continent/${slug}`, continent, {
//     headers: {
//       token,
//     },
//   })

export const addTour = async (tour, token) =>
  await axios.post(`${process.env.REACT_APP_API}/tour`, tour, {
    headers: {
      token,
    },
  })


  