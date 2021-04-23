import moment from 'moment'
import { Button, DatePicker } from 'antd'

const AddTourForm = ({
  tourInfo,
  setTourInfo,
  handleChange,
  handleSubmit,
  handleContinentChange,
  countryOptions,
  displayCountries,
}) => {
  const {
    title,
    description,
    address,
    price,
    continents,
    countries,
    images,
    startDate,
    maxPeople,
    duration,
    overview,
    difficulty,
    difficulties,
    startLongitude,
    startLatitude,
    areaLongitude,
    areaLatitude,
  } = tourInfo

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          onChange={handleChange}
          value={title}
          name='title'
          type='text'
          className='form-control input-background p-3'
          placeholder='Title'
          autoFocus
        />
        <label>Title</label>
      </div>
      <div className='form-group'>
        <textarea
          onChange={handleChange}
          value={description}
          name='description'
          type='text'
          className='form-control input-background p-3'
          placeholder='Description'
        />
        <label>Description</label>
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange}
          value={overview}
          name='overview'
          type='text'
          className='form-control input-background p-3'
          placeholder='Summary'
        />
        <label>Summary</label>
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange}
          value={address}
          name='address'
          type='text'
          className='form-control input-background p-3'
          placeholder='Address'
        />
        <label>Address</label>
      </div>

      <div className='form-group'>
        <select
          name='difficulty'
          className='form-control input-background mt-5 pl-3'
          onChange={handleChange}
        >
          <option>Select difficulty</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange}
          value={price}
          name='price'
          type='number'
          className='form-control input-background p-3'
          placeholder='Price'
        />
        <label>Price</label>
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange}
          value={duration}
          type='number'
          name='duration'
          className='form-control input-background p-3'
          placeholder='Duration'
        />
        <label>Duration</label>
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange}
          value={maxPeople}
          type='number'
          name='maxPeople'
          className='form-control input-background p-3'
          placeholder='Max amount of people'
        />
        <label>Max amount of people</label>
      </div>
      <div className='form-group'>
        <DatePicker
          style={{ color: 'black' }}
          placeholder='Start Date'
          className='form-control input-background p-3 mt-5'
          onChange={(date, dateString) =>
            setTourInfo({ ...tourInfo, startDate: dateString })
          }
          disabledDate={(currentDate) =>
            currentDate && currentDate.valueOf() < moment().subtract(1, 'days')
          }
        />
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange}
          value={areaLongitude}
          type='number'
          name='areaLongitude'
          className='form-control input-background p-3'
          placeholder='Area longitude'
        />
        <label>Area longitude</label>
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange}
          value={areaLatitude}
          type='number'
          name='areaLatitude'
          className='form-control input-background p-3'
          placeholder='Area latitude'
        />
        <label>Area latitude</label>
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange}
          value={startLongitude}
          type='number'
          name='startLongitude'
          className='form-control input-background p-3'
          placeholder='Start longitude'
        />
        <label>Start location longitude</label>
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange}
          value={startLatitude}
          type='number'
          name='startLatitude'
          className='form-control input-background p-3'
          placeholder='Start latitude'
        />
        <label>Start location latitude</label>
      </div>

      <div className='form-group'>
        <select
          name='continent'
          className='form-control input-background mt-5 pl-3'
          onChange={handleContinentChange}
          placeholder='Select continent'
        >
          <option>Select continent</option>
          {continents.length > 0 &&
            continents.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {displayCountries && (
        <div className='form-group'>
          <select
            name='country'
            className='form-control input-background mt-5 mb-4 pl-3'
            onChange={handleChange}
          >
            <option>Select country</option>
            {countryOptions.length > 0 &&
              countryOptions.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
      )}
      <Button
        onClick={handleSubmit}
        block
        className='btn btn-outline-info mt-3 mb-5'
      >
        Save tour
      </Button>
    </form>
  )
}

export default AddTourForm
