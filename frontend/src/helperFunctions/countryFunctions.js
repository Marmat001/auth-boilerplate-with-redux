import axios from 'axios'

export const getCountries = async () =>
  await axios.get(`${process.env.REACT_APP_API}/countries`)

export const getCountry = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/country/${slug}`)

export const removeCountry = async (slug, token) =>
  await axios.delete(`${process.env.REACT_APP_API}/country/${slug}`, {
    headers: {
      token,
    },
  })

export const updateCountry = async (slug, country, token) =>
  await axios.put(`${process.env.REACT_APP_API}/country/${slug}`, country, {
    headers: {
      token,
    },
  })

export const addCountry = async (country, token) =>
  await axios.post(`${process.env.REACT_APP_API}/country`, country, {
    headers: {
      token,
    },
  })
