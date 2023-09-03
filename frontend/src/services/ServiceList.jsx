import React from 'react';
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';
import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const servicesData = [
  {
    imgUrl: weatherImg,
    title: 'Protection from Extreme Weathers',
    desc: 'Our venues are desinged for extreme hot and cold weather.',
  },
  {
    imgUrl: guideImg,
    title: 'Easy to search and book',
    desc: 'Effortlessly find and book the perfect venue and enjoy to the fullest the happiest moments of your life.',
  },
  {
    imgUrl: customizationImg,
    title: 'Be a Partner',
    desc: 'Join our network of partners to reach wider audience, hence expanding your business opportunities.',
  },
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
