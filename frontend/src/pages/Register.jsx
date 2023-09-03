import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import registerImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import CustomizedSnackbars from '../shared/CustomizedSnackbars';

const Register = () => {
   const [credentials, setCredentials] = useState({
      username: undefined,
      email: undefined,
      password: undefined,
      role: 'user', // Default role is 'user'
   });

   const [registerAlertOpen, setRegisterAlertOpen] = useState(false);
   const [registerAlertSeverity, setRegisterAlertSeverity] = useState('error');
   const [registerAlertMessage, setRegisterAlertMessage] = useState('');

   const { dispatch } = useContext(AuthContext);
   const navigate = useNavigate();

   const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
   };


   
      const handleClick = async (e) => {
         e.preventDefault();
   
         // Password validation logic
         const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
         if (!passwordRegex.test(credentials.password)) {
            setRegisterAlertOpen(true);
            setRegisterAlertSeverity('error');
            setRegisterAlertMessage('Password should contain a number, a special character, and be a minimum of 8 characters.');
            return;
         }
      try {
         const res = await fetch(`${BASE_URL}/auth2/register2`, {
            method: 'post',
            headers: {
               'content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
         });
         const result = await res.json();
   
         if (!res.ok) {
            // Display the registration error message
            setRegisterAlertOpen(true);
            setRegisterAlertSeverity('error');
            setRegisterAlertMessage(result.message);
         } else {
            dispatch({ type: 'REGISTER_SUCCESS' });
            navigate('/login');
         }
      } catch (err) {
         // Display the registration error message for other errors (e.g., network issues)
         setRegisterAlertOpen(true);
         setRegisterAlertSeverity('error');
         setRegisterAlertMessage(err.message);
      }
   };

   return (
      <section>
         <Container>
            <Row>
               <Col lg="8" className="m-auto">
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={registerImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Register</h2>

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input type="text" placeholder="Name" id="username" onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="email" placeholder="Email" id="email" onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="password" placeholder="Password" id="password" onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <label htmlFor="role" style={{ color: '#ffec08', marginBottom: '0.5rem', marginRight: '0.5rem', fontWeight: 'bold' }}>
                                 Role:
                              </label>
                              <select
                                 id="role"
                                 onChange={handleChange}
                                 defaultValue="user"
                                 style={{ padding: '0.0rem', borderRadius: '2px', border: '1px solid #ccc', minWidth: '100px' }}
                              >
                                 <option value="user">User</option>
                                 <option value="admin">Admin</option>
                              </select>
                           </FormGroup>
                           <Button className="btn secondary__btn auth__btn" type="submit">
                              Create Account
                           </Button>
                        </Form>
                        <p>
                           Already have an account? <Link to="/login">Login</Link>
                        </p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>

         {/* Display the CustomizedSnackbars for registration errors */}
         <CustomizedSnackbars
            severity={registerAlertSeverity}
            message={registerAlertMessage}
            open={registerAlertOpen}
            onClose={() => setRegisterAlertOpen(false)}
         />
      </section>
   );
};

export default Register;
