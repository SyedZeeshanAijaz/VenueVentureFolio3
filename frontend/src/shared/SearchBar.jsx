import React, { useRef } from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';
import CustomizedSnackbars from './CustomizedSnackbars';
import { useState } from 'react';

const SearchBar = () => {
  const cityRef = useRef('');
  const priceRef = useRef(0);
  const capacityRef = useRef(0);
  const nameRef = useRef(''); // Step 1: Add nameRef

  const navigate = useNavigate();

  const [venueSuccess, setVenueSuccess] = useState(false);


  const searchHandler = async () => {
    const city = cityRef.current.value.trim().toLowerCase();
    const price = priceRef.current.value;
    const capacity = capacityRef.current.value;
    const name = nameRef.current.value.trim();
  
    // Check if all fields are empty, and return early if true
    if (!city && !price && !capacity && !name) {
      setVenueSuccess(true);
    return;
    }
  
    const searchParams = new URLSearchParams();
    if (city) {
      searchParams.append('city', city);
    }
    if (price) {
      searchParams.append('price', price);
    }
    if (capacity) {
      searchParams.append('capacity', capacity);
    }
    if (name) {
      searchParams.append('name', name);
    }
  
    const res = await fetch(
      `${BASE_URL}/tours/search/getTourBySearch?city=${city}&price=${price}&capacity=${capacity}&name=${name}`
    );
  
    if (!res.ok) alert('Something went wrong');
  
    const result = await res.json();
    console.log('search result', result);
  
    navigate(`/tours/search?${searchParams.toString()}`, { state: result.data });
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
                    {/* Step 2: Add the input field for the 'name' parameter */}
                    <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-building-line"></i>
            </span>
            <div>
              <div className="my-1">
                <h6>Venue Name</h6>
              </div>
              <input type="string" placeholder=" Enter name" ref={nameRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <div className="my-1">
                <h6>City</h6>
              </div>
              <input type="string" placeholder=" Enter city" ref={cityRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-money-dollar-circle-line"></i>
            </span>
            <div>
              <div className="my-1">
                <h6>Price</h6>
              </div>
              <input
                type="number"
                placeholder=" Enter price"
                ref={priceRef}
                inputMode="numeric"
                min="1"
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <div className="my-1">
                <h6>Capacity</h6>
              </div>
              <input
                type="number"
                placeholder=" Enter Capacity"
                ref={capacityRef}
                inputMode="numeric"
                min="1"
              />
            </div>
          </FormGroup>

          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
      <CustomizedSnackbars
          severity="info"
          message="Please fill field in search bar"
          open={venueSuccess}
          onClose={() => setVenueSuccess(false)}
        />
    </Col>
  );
};

export default SearchBar;
