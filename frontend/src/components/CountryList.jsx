import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCountries } from '../helperFunctions/countryFunctions'
import { LoadingOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const CountryList = () => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getCountries().then((c) => {
      setCountries(c.data)
      setLoading(false)
    })
  }, [])

  const displayCountries = () =>
    countries.map((c) => (
      <Button
        key={c._id}
        className='col m-4 pb-5 pt-3 btn btn-raised btn-outline-info btn-lg'
      >
        <Link to={`/country/${c.slug}`}>{c.name}</Link>
      </Button>
    ))

  return (
    <div className='container'>
      <div className='row p-4'>
        {loading ? (
          <div className='col text-center'>
            <LoadingOutlined className='loading-spinner' />
          </div>
        ) : (
          displayCountries()
        )}
      </div>
    </div>
  )
}

export default CountryList
