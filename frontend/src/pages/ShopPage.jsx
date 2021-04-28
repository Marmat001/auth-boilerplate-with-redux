import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchFilteredTours,
  getAllTours,
} from '../helperFunctions/tourFunctions'
import {
  LoadingOutlined,
  DollarOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'
import TourCard from '../components/TourCard'
import { Button, Menu, Slider, Checkbox } from 'antd'
import { getContinents } from '../helperFunctions/continentFunctions'
import { getCountries } from '../helperFunctions/countryFunctions'

const { SubMenu, Item } = Menu

const ShopPage = () => {
  const dispatch = useDispatch()

  const [tours, setTours] = useState([])
  const [continents, setContinents] = useState([])
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')
  const [continentsIds, setContinentsIds] = useState([])
  const [loading, setLoading] = useState(false)
  const [menuOpen, setMenuOpen] = useState(true)
  const [price, setPrice] = useState([0, 0])
  const [approved, setApproved] = useState(false)

  const search = useSelector((state) => state.search)
  const { text } = search

  useEffect(() => {
    importAllTours()
    getContinents().then((resp) => setContinents(resp.data))
    getCountries().then((resp) => setCountries(resp.data))
  }, [])

  const fetchTours = (text) => {
    fetchFilteredTours(text).then((resp) => {
      setTours(resp.data)
    })
  }

  const importAllTours = () => {
    setLoading(true)
    getAllTours(12).then((t) => {
      setTours(t.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchTours({ query: text })
    }, 300)

    return () => clearTimeout(debounce)
  }, [text])

  useEffect(() => {
    fetchTours({ price })
  }, [approved])

  const handlePrice = (price) => {
    dispatch({
      type: 'FILTER_SEARCH',
      payload: { text: '' },
    })
    setContinentsIds([])
    setPrice(price)
    setCountry('')
    setTimeout(() => {
      setApproved(!approved)
    }, 300)
  }

  const handlePick = (e) => {
    dispatch({
      type: 'FILTER_SEARCH',
      payload: { text: '' },
    })

    setPrice([0, 0])
    setCountry('')

    const continentIdsInState = [...continentsIds]
    let checked = e.target.value
    let foundInState = continentIdsInState.indexOf(checked)

    if (foundInState === -1) {
      continentIdsInState.push(checked)
    } else {
      continentIdsInState.splice(foundInState, 1)
    }

    setContinentsIds(continentIdsInState)
    fetchTours({ continent: continentIdsInState })
  }

  const displayContinents = () =>
    continents.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handlePick}
          className='pl-4 pr-4 p-3'
          value={c._id}
          checked={continentsIds.includes(c._id)}
          name='continent'
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ))

  const handleCountry = (country) => {
    setCountry(country)

    dispatch({
      type: 'FILTER_SEARCH',
      payload: { text: '' },
    })

    setPrice([0, 0])
    setContinentsIds([])
    fetchTours({ country })
  }

  const displayCountries = () =>
    countries.map((c) => (
      <div
        key={c._id}
        onClick={() => handleCountry(c)}
        className='p-2 m-1 badge badge-secondary pointer'
      >
        {c.name}
      </div>
    ))

  const handleResetFilters = () => {
    dispatch({
      type: 'FILTER_SEARCH',
      payload: { text: '' },
    })
    setPrice([0, 0])
    setContinentsIds([])
    setCountry('')
    importAllTours()
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        {menuOpen && (
          <div className='col-md-3 pt-5'>
            <Menu mode='inline' defaultOpenKeys={['1', '2', '3']}>
              <h4 className='text-center pt-2 tertiary-heading'>
                Filter Tours
              </h4>
              <div className='text-center'>
                <Button onClick={handleResetFilters}>Reset filters</Button>
              </div>
              <SubMenu
                key='1'
                title={
                  <span className='h6'>
                    <DollarOutlined /> Price
                  </span>
                }
              >
                <div>
                  <Slider
                    className='ml-4 mr-4'
                    tipFormatter={(p) => `$${p}`}
                    range
                    value={price}
                    onChange={handlePrice}
                    max='2999'
                  />
                </div>
              </SubMenu>

              <SubMenu
                key='2'
                title={
                  <span className='h6'>
                    <GlobalOutlined /> Continents
                  </span>
                }
              >
                <div>{displayContinents()}</div>
              </SubMenu>

              <SubMenu
                key='3'
                title={
                  <span className='h6'>
                    <EnvironmentOutlined /> Countries
                  </span>
                }
              >
                <div className='pl-4 pr-4'>{displayCountries()}</div>
              </SubMenu>
            </Menu>
          </div>
        )}

        <div className={`${menuOpen ? 'col-md-9' : 'col-md-12'}`}>
          <Button
            className='btn btn-outline-info mt-3'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Filters
          </Button>
          <div className='col text-center'>
            {loading ? (
              <LoadingOutlined className='loading-spinner' />
            ) : tours.length < 1 ? (
              <h1 className='tours-heading text-center'>No tours found</h1>
            ) : (
              <h1 className='tours-heading'>Tours</h1>
            )}
          </div>

          <div className='row pb-5'>
            {tours.map((t) => (
              <div key={t._id} className='col-md-4 mb-5'>
                <TourCard tour={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
