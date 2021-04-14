import axios from 'axios'

export const getContinents = async () =>
  await axios.get(`${process.env.REACT_APP_API}/continents`)

export const getContinent = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/continent/${slug}`)

export const removeContinent = async (slug, token) =>
  await axios.delete(`${process.env.REACT_APP_API}/continent/${slug}`, {
    headers: {
      token,
    },
  })

export const updateContinent = async (slug, continent, token) =>
  await axios.put(`${process.env.REACT_APP_API}/continent/${slug}`, continent, {
    headers: {
      token,
    },
  })

export const addContinent = async (continent, token) =>
  await axios.post(`${process.env.REACT_APP_API}/continent`, continent, {
    headers: {
      token,
    },
  })


  export const getContinentsCountries = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/continent/countries/${id}`)