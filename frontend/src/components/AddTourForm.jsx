import moment from 'moment'
import { Button, DatePicker } from 'antd'

const AddTourForm = ({ tourInfo, setTourInfo, handleChange, handleSubmit }) => {
  const {
    title,
    description,
    price,
    continent,
    country,
    images,
    startDate,
    maxPeople,
    duration,
    overview,
  } = tourInfo
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          onChange={handleChange('title')}
          value={title}
          type='text'
          className='form-control input-background p-3'
          placeholder='Title'
          autoFocus
        />
        <label>Title</label>
      </div>

      <div className='form-group'>
        <textarea
          onChange={handleChange('description')}
          value={description}
          type='text'
          className='form-control input-background p-3'
          placeholder='Description'
        />
        <label>Description</label>
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange('overview')}
          value={overview}
          type='text'
          className='form-control input-background p-3'
          placeholder='Summary'
        />
        <label>Summary</label>
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange('price')}
          value={price}
          type='number'
          className='form-control input-background p-3'
          placeholder='Price'
        />
        <label>Price</label>
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange('duration')}
          value={duration}
          type='number'
          className='form-control input-background p-3'
          placeholder='Duration'
        />
        <label>Duration</label>
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange('maxPeople')}
          value={maxPeople}
          type='number'
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
          disabledDate={
            (currentDate) =>
              currentDate &&
              currentDate.valueOf() < moment().subtract(0, 'days') //1 day
          }
        />
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

export default AddTourForm
