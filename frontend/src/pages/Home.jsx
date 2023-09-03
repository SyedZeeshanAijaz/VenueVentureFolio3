import React, { useEffect } from 'react';
import '../styles/home.css';
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img01.mp4';
import heroImg02 from '../assets/images/hero-img02.mp4';
import heroVideo from '../assets/images/hero-video.mp4';
import experienceImg from '../assets/images/experience.jpg';

import Subtitle from './../shared/subtitle';
import SearchBar from './../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';



const Home = () => {

  useEffect(() => {
    window.scrollTo(0,0)
  }, []);

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="hero__section" style={{ backgroundColor: '#042d66', color: 'white' }}>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">

                <h1 style={{ color: 'white' }}>Find Your Ideal Celebration Space <span className="highlight"></span></h1>
                <p style={{ color: 'white' }}>
                Discover the perfect venue for your upcoming celebrations at Venture
          Venue. Whether you're planning a joyous wedding, a vibrant party, an
          enchanting engagement, or any other special occasion, we are here to
          bring your unforgettable moments to life. With our diverse selection
          of venues, you can easily find the perfect location that suits your
          preferences, be it in terms of location, price, or capacity. Start
          your journey with us and let Venture Venue be the starting point of
          your memorable celebrations.
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box">
              <video src={heroImg} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box hero__video-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
              <video src={heroImg02} alt="" controls />
              </div>
            </Col>

            <SearchBar />
          </Row>
        </Container>
      </section>
      {/* ============================================================== */}

      {/* ==================== SERVICES SECTION START ====================== */}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/* ========== FEATURED VENUE SECTION START ========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={'Featured Venues'} />
              <h2 className="featured__tour-title">Our featured Venues</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* ========== FEATURED VENUE SECTION END =========== */}

     {/* ========== EXPERIENCE SECTION START ============ */}
     <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={'Experience'} />
                <h2>With our all experience <br /> we will serve you</h2>
                <p>With our vast expertise and accumulated experience, we are dedicated to providing exceptional service and meeting your needs with utmost professionalism and proficiency. Our team consists of highly skilled individuals who have honed their abilities through years of practice and continuous learning. 

</p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>100+</span>
                  <h6>Successful bookings</h6>
                </div>
                <div className="counter__box">
                  <span>50+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className="counter__box">
                  <span>9</span>
                  <h6>Year experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========== EXPERIENCE SECTION END ============== */}

      {/* ========== GALLERY SECTION START ============== */}
      <section id='gallery'>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={'Gallery'} />
              <h2 className="gallery__title">Our Venues Gallery</h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========== GALLERY SECTION END ================ */}

      {/* ========== TESTIMONIAL SECTION START ================ */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={'Customers Love'} />
              <h2 className="testimonial__title">What our Customers say about us</h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========== TESTIMONIAL SECTION END ================== */}
    </>
  );
};

export default Home;
