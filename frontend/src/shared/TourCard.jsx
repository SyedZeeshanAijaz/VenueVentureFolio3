import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './tour-card.css';
import calculateAvgRating from '../utils/avgRating';

const TourCard = ({ tour }) => {
  // console.log('Tour data in TourCard:', tour);
  
  const { _id, name, city, photo, price, capacity, featured, reviews } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className='tour__card'>
      <Card>
        <div className='tour__img'>
          <img src={photo} alt='tour-img' />
          {featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className='card__top d-flex align-items-center justify-content-between'>

            <span className='venue__location d-flex align-items-center gap-1'>
              <i className='ri-map-pin-line'></i> {city}
            </span>
            <span className='venue__rating d-flex align-items-center gap-1'>
              <i className='ri-star-fill'></i> {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? 'Not rated' : <span>({reviews.length})</span>}
            </span>
          </div>

          <h5 className='venue__title'>
            <Link to={`/tours/${_id}`}>{name}</Link>
          </h5>

          <div className='card__bottom d-flex align-items-center justify-content-between mt-3'>
            <div>
              <span className='venue__price'>{price} PKR</span>
              <br />
              <span className='venue__capacity'>{capacity} Capacity</span>
            </div>

            <Link to={`/tours/${_id}`}>
              <button className='booking__btn'>Reserve Now</button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
