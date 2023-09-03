import React from 'react';
import Slider from 'react-slick';
import ava01 from '../../assets/images/ava-1.jpg';
import ava02 from '../../assets/images/ava-2.jpg';
import ava03 from '../../assets/images/ava-3.jpg';
import ava04 from '../../assets/images/ava-4.jpg';

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>I highly recommend your venue booking service. It saved me time and effort in searching for the perfect venue for my birthday party. The website's filters and search functionality made it easy to narrow down my options, and I found a venue that matched my preferences perfectly. </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
          <div
            style={{ backgroundImage: `url(${ava01})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '80px', height: '80px', borderRadius: '50%' }}
          />
          <div>
            <h6 className='mb-0 mt-3'>Muhammad Arsalan</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>I recently used your venue booking service for a corporate event, and it was a fantastic experience. The website showcased venues suitable for our needs, and the booking process was quick and efficient. The team behind the service was professional and responsive.</p>

        <div className='d-flex align-items-center gap-4 mt-3'>
          <div
            style={{ backgroundImage: `url(${ava02})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '80px', height: '80px', borderRadius: '50%' }}
          />
          <div>
            <h6 className='mb-0 mt-3'>Umair Malik</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>I had a great experience using your venue booking service. The website was easy to navigate, and I found the perfect venue for my event. The booking process was smooth, and the customer support was excellent. Highly recommended!</p>

        <div className='d-flex align-items-center gap-4 mt-3'>
          <div
            style={{ backgroundImage: `url(${ava04})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '80px', height: '80px', borderRadius: '50%' }}
          />
          <div>
            <h6 className='mb-0 mt-3'>Amjad Hussain</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>Your venue booking website made it convenient to find and book a venue for my wedding. I appreciated the range of options available and the detailed information provided for each venue. The service exceeded my expectations, and I couldn't be happier with the outcome. </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
          <div
            style={{ backgroundImage: `url(${ava03})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '80px', height: '80px', borderRadius: '50%' }}
          />
          <div>
            <h6 className='mb-0 mt-3'>Huzaifa </h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonials;
