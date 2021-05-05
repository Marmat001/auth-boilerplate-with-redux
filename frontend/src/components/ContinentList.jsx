import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getContinents } from '../helperFunctions/continentFunctions'
import { LoadingOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const ContinentList = () => {
  const [continents, setContinents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getContinents().then((c) => {
      setContinents(c.data)
      setLoading(false)
    })

    return () => {
      setContinents([])
    }
  }, [])

  const displayContinents = () =>
    continents.map((c) => (
      <Button
        key={c._id}
        className='col m-2 pb-5 pt-3 btn btn-raised btn-outline-info btn-lg'
      >
        <Link to={`/continent/${c.slug}`}>{c.name}</Link>
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
          displayContinents()
        )}
      </div>
    </div>
  )
}

export default ContinentList
