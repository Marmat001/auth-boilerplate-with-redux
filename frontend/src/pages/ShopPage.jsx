import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchFilteredTours,
  getAllTours,
} from '../helperFunctions/tourFunctions'
import { LoadingOutlined, DollarOutlined } from '@ant-design/icons'
import TourCard from '../components/TourCard'
import { Button, Menu, Slider } from 'antd'

const { SubMenu, Item } = Menu

const ShopPage = () => {
  const dispatch = useDispatch()

  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(false)
  const [menuOpen, setMenuOpen] = useState(true)
  const [price, setPrice] = useState([0, 0])
  const [approved, setApproved] = useState(false)

  const search = useSelector((state) => state.search)
  const { text } = search

  console.log(text)

  useEffect(() => {
    importAllTours()
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
    setPrice(price)
    setTimeout(() => {
      setApproved(!approved)
    }, 300)
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        {menuOpen && (
          <div className='col-md-3 pt-2'>
            <Menu mode='inline' defaultOpenKeys={['1']}>
              <h4 className='text-center pt-2 tertiary-heading'>
                Filter Tours
              </h4>
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
            ) : (
              <h1 className='tours-heading'>Tours</h1>
            )}
          </div>
          {tours.length < 1 && <p>No tours found</p>}

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
