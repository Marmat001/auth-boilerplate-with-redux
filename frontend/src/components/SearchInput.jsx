import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'

const SearchInput = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const search = useSelector((state) => state.search)
  const { text } = search

  const handleChange = (e) => {
    dispatch({
      type: 'FILTER_SEARCH',
      payload: { text: e.target.value },
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    history.push(`/tours?${text}`)
  }

  return (
    <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type='search'
        value={text}
        className='form-control pl-2 search-background mr-sm-2'
        placeholder='Search...'
      />

      <SearchOutlined className='pointer' onClick={handleSubmit} />
    </form>
  )
}

export default SearchInput
