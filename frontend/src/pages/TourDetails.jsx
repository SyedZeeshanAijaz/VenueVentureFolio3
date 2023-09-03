import React, { useState, useRef, useEffect, useContext } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import CustomizedSnackbars from "../shared/CustomizedSnackbars";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  const [reviewData, setReviewData] = useState([]);

  

  const [selectedStar, setSelectedStar] = useState(null);

  const handleStarClick = (rating) => {
    setSelectedStar((prevRating) => (prevRating === rating ? null : rating));
    setTourRating((prevRating) => (prevRating === rating ? null : rating));
  };

  // fetch data from database
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    name,
    desc,
    price,
    reviews,
    city,
    address,
    distance,
    capacity,
  } = tour || {};

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  // alert states
  const [loginAlertOpen, setLoginAlertOpen] = useState(false);
  const [reviewAlertOpen, setReviewAlertOpen] = useState(false);
  const [reviewSubmitOpen, setReviewSubmitOpen] = useState(false);
  const [reviewBookOpen, setReviewBookOpen] = useState(false);


  const submitHandler = async (e) => {
    e.preventDefault();
  
    const reviewText = reviewMsgRef.current.value;
    try {
      if (!user || !user._id) { // Use user._id to check for the userId
        setLoginAlertOpen(true);
        return;
      }
  
      if (!tourRating) {
        setReviewAlertOpen(true);
        return;
      }
  
      const reviewObj = {
        userId: user._id, // Use user._id as the userId
        username: user?.username,
        reviewText,
        rating: tourRating,
      };
  
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });
  
      const result = await res.json();
      console.log(result);


      if (!res.ok) {
        setReviewBookOpen(true)
        return result.message;
      }
  
      setReviewData([...reviewData, reviewObj]);
      setSelectedStar(null);
      reviewMsgRef.current.value = "";
      setReviewSubmitOpen(true);
    } catch (error) {
      console.log(error);
      alert("Failed to submit the review");
    }
  };
  

  useEffect(() => {
    if (tour) {
      setReviewData(tour.reviews || []);
    }
  }, [tour]);

  const sortedReviewData = [...reviewData].reverse();


  return (
    <section>
    <Container>
      {loading && <h4 className="text-center pt-5">LOADING.........</h4>}
      {error && <h4 className="text-center pt-5">{error}</h4>}
      {!loading && !error && (
        <Row>
          <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt="" />

                <div className="tour__info">
                  <h2>{name}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i
                        className="ri-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>{" "}
                      {avgRating === 0 ? "Not rated" : avgRating}
                      {avgRating === 0 ? null : <span>({reviews?.length})</span>}
                    </span>

                    <span>
                      <i className="ri-map-pin-fill"></i> {address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <i className="ri-map-pin-2-line"></i> {city}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i> {price} / per meal
                    </span>
                    <span>
                      <i className="ri-group-line"></i> {capacity} people capacity
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>

                {/* ============ TOUR REVIEWS SECTION START ============ */}
                {tour && (
                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviewData.length} reviews)</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => handleStarClick(1)}>
                          1{" "}
                          <i
                            className={
                              selectedStar === 1
                                ? "ri-star-s-fill selected"
                                : "ri-star-s-fill"
                            }
                          ></i>
                        </span>
                        <span onClick={() => handleStarClick(2)}>
                          2{" "}
                          <i
                            className={
                              selectedStar === 2
                                ? "ri-star-s-fill selected"
                                : "ri-star-s-fill"
                            }
                          ></i>
                        </span>
                        <span onClick={() => handleStarClick(3)}>
                          3{" "}
                          <i
                            className={
                              selectedStar === 3
                                ? "ri-star-s-fill selected"
                                : "ri-star-s-fill"
                            }
                          ></i>
                        </span>
                        <span onClick={() => handleStarClick(4)}>
                          4{" "}
                          <i
                            className={
                              selectedStar === 4
                                ? "ri-star-s-fill selected"
                                : "ri-star-s-fill"
                            }
                          ></i>
                        </span>
                        <span onClick={() => handleStarClick(5)}>
                          5{" "}
                          <i
                            className={
                              selectedStar === 5
                                ? "ri-star-s-fill selected"
                                : "ri-star-s-fill"
                            }
                          ></i>
                        </span>
                      </div>
                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Review the venue"
                          required
                        />
                        <button className="btn primary__btn text-white" type="submit">
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user__reviews">
                    {sortedReviewData.length === 0 ? (
                      <div className="review__item">No reviews yet.</div>
                    ) : (
                      sortedReviewData.map((review, index) => (
                        <div key={index} className="review__item">
                            <img src={avatar} alt="" />
                            <div className="w-100">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h5>{review.username}</h5>
                                  {review.createdAt && (
                                    <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                                  )}
                                </div>
                                <span className="d-flex align-items-center">
                                  {review.rating}
                                  <i className="ri-star-s-fill"></i>
                                </span>
                              </div>
                              <h6>{review.reviewText}</h6>
                            </div>
                          </div>
                        ))
                      )}
                    </ListGroup>
                  </div>
                )}
                {/* ============ TOUR REVIEWS SECTION END ============== */}
              </div>
            </Col>

            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        )}
      </Container>
      <CustomizedSnackbars
        severity="error"
        message="Please sign in"
        open={loginAlertOpen}
        onClose={() => setLoginAlertOpen(false)}

      />

<CustomizedSnackbars
        severity="error"
        message="Please select rating star before submitting the review"
        open={reviewAlertOpen}
        onClose={() => setReviewAlertOpen(false)}

      />
      <CustomizedSnackbars
      severity="success"
      message="Review Submitted"
      open={reviewSubmitOpen}
      onClose={() => setReviewSubmitOpen(false)}

    />
          <CustomizedSnackbars
      severity="info"
      message="You must book the venue before submitting a review"
      open={reviewBookOpen}
      onClose={() => setReviewBookOpen(false)}

    />
        {/* <CustomizedSnackbars
          severity="success"
          message="Reservation added successfully"
          open={bookingAdd}
          onClose={() => setBookingAdd(false)}
        /> */}
    </section>
  );
};

export default TourDetails;