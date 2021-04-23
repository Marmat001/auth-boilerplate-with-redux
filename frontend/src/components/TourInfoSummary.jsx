import { Link } from 'react-router-dom'
import moment from 'moment'

const TourInfoSummary = ({ tour }) => {
  const { price, continent, country, booked, duration, createdAt } = tour

  return (
    <ul className='list-group'>
      <li className='list-group-item'>
        Price
        <span className='label label-default label-pill pull-xs-right'>
          $ {price}
        </span>
      </li>

      <li className='list-group-item'>
        Continent
        <Link
          to={`/continent/${continent?.slug}`}
          className='label label-default label-pill pull-xs-right'
        >
          {continent?.name}
        </Link>
      </li>

      {country && (
        <li className='list-group-item'>
          Country
          <Link
            to={`/country/${country[0]?.slug}`}
            className='label label-default label-pill pull-xs-right'
          >
            {country[0]?.name}
          </Link>
        </li>
      )}

      <li className='list-group-item'>
        Amount of times booked
        <span className='label label-default label-pill pull-xs-right'>
          {booked}
        </span>
      </li>

      <li className='list-group-item'>
        Duration
        <span className='label label-default label-pill pull-xs-right'>
          {duration} {duration < 2 ? 'day' : 'days'}
        </span>
      </li>

      <li className='list-group-item'>
        Listed on
        <span className='label label-default label-pill pull-xs-right'>
          {moment(new Date(createdAt)).format('MMMM Do YYYY')}
        </span>
      </li>
    </ul>
  )
}

export default TourInfoSummary
