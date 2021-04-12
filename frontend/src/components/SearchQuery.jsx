const SearchQuery = ({ query, setQuery }) => {
  const handleSearch = (e) => {
    e.preventDefault()
    setQuery(e.target.value.toLowerCase())
  }
  return (
    <div className='form-group'>
      <input
        type='search'
        placeholder='Filter by search'
        value={query}
        onChange={handleSearch}
        className='form-control input-background p-2 w-50 mb-3'
      />
      <label>Filter by search</label>
    </div>
  )
}

export default SearchQuery
