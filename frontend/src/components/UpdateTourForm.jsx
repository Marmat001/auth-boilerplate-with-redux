import moment from 'moment'
import { Button, DatePicker } from 'antd'

const UpdateTourForm = ({
  tourInfo,
  setTourInfo,
  handleChange,
  handleSubmit,
  handleContinentChange,
  countryOptions,
  continents,
  arrOfCountryIds,
  setArrOfCountryIds,
  selectedContinent,
}) => {
  const {
    title,
    description,
    price,
    continent,
    images,
    startDate,
    maxPeople,
    duration,
    overview,
    difficulty,
    difficulties,
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
        <select
          value={difficulty}
          name='difficulty'
          className='form-control input-background mt-5 pl-3'
          onChange={handleChange}
        >
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

      {startDate && (
        <DatePicker
          defaultValue={moment(startDate, 'YYYY-MM-DD')}
          placeholder='Start Date'
          className='form-control input-background p-3 mt-5'
          onChange={(date, dateString) =>
            setTourInfo({ ...tourInfo, startDate: dateString })
          }
          disabledDate={(currentDate) =>
            currentDate && currentDate.valueOf() < moment().subtract(1, 'days')
          }
        />
      )}

      <div className='form-group'>
        <select
          name='continent'
          className='form-control input-background mt-5 pl-3'
          onChange={handleContinentChange}
          placeholder='Select continent'
          value={selectedContinent ? selectedContinent : continent._id} //?
        >
          {continents.length > 0 &&
            continents.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className='form-group'>
        <select
          name='country'
          className='form-control input-background mt-5 mb-4 pl-3'
          onChange={(e) => setArrOfCountryIds(e.target.value)}
          value={arrOfCountryIds}
        >
          {countryOptions.length > 0 &&
            countryOptions.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

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

export default UpdateTourForm
