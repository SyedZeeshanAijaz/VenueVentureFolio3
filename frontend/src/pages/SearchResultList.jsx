import React, { useState } from 'react';
import CommonSection from './../shared/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import TourCard from '../shared/TourCard';

const SearchResultList = () => {
  const location = useLocation();
  const [data] = useState(location.state);

  return (
    <>
      <CommonSection title={'Venue Search Result'} />
      <section>
        <div className="container">

        </div>
      </section>
      <section>
        <Container>
          <Row>
            {data && data.length > 0 ? (
              data.map((tour) => (
                <Col lg='3' className='mb-4' key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            ) : (
              <h4 className='text-center'>No Venue Found</h4>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SearchResultList;
