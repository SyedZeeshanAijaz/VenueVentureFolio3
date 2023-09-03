import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import CustomizedSnackbars from '../shared/CustomizedSnackbars';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginAlertOpen, setLoginAlertOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginAlertSeverity, setLoginAlertSeverity] = useState('error');
  const [loginAlertMessage, setLoginAlertMessage] = useState('');

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await fetch(`${BASE_URL}/auth2/login2`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        // Display the login error message using the CustomizedSnackbars component
        setLoginAlertOpen(true);
        setLoginAlertSeverity('error');
        setLoginAlertMessage(result.message);
      } else {
        dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });

        if (result.data.role === 'admin') {
          // Redirect to admin dashboard if the role is admin
          navigate('/admin');
        } else {
          // Redirect to home page (or any other user-specific page) if the role is not admin
          navigate('/');
        }
      }
    } catch (err) {
      // Display the login error message for other errors (e.g., network issues) using the CustomizedSnackbars component
      setLoginOpen(true);
      setLoginAlertSeverity('error');
      setLoginAlertMessage('An error occurred while logging in. Please try again later.');
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="email" placeholder="Email" id="email" onChange={handleChange} required />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder="Password" id="password" onChange={handleChange} required />
                  </FormGroup>
                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {/* Display the CustomizedSnackbars */}
      <CustomizedSnackbars
        severity={loginAlertSeverity}
        message={"Please enter correct credentials"}
        children={loginAlertMessage}
        open={loginAlertOpen}
        onClose={() => setLoginAlertOpen(false)}
      />
            <CustomizedSnackbars
        severity="error"
        message={"An error occurred while logging in. Please try again later."}
        children={loginAlertMessage}
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </section>
  );
};

export default Login;
