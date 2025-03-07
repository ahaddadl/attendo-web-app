import { Link } from 'react-router-dom';
import dayjs from '../../../lib/dayjs.js';

function EventItem({ event, onDelete }) {
    console.log(event)
    return (
      <div className="card event-item">
        <img src={event.poster} className="card-img-top" alt={event.title} />
        <div className="card-body">
          <h5 className="card-title mb-1 fw-light text-break"><Link to={`/events/${event.id}`}>{event.title}</Link></h5>
          <p className='mb-0 fs-xs'><strong>Start: {dayjs(event.startDate).format('lll')}</strong></p>
          <p className='mb-0 fs-xs'><strong>End: {dayjs(event.endDate).format('lll')}</strong></p>
          <p className="text-muted fw-lighter fs-xs">{event.address.city}, {event.address?.street}</p>
          <div className="d-flex gap-1 flex-wrap mb-1">
            {event.categories?.map((category) => (
              <span key={category} className='badge text-bg-light'>{category}</span>
            ))}
          </div>
          <button className='btn btn-sm btn-danger' onClick={() => onDelete(event)}>delete</button>
        </div>
      </div>
    )
  }
  
  export default EventItem;