import React, { useContext } from 'react';
import { Container, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import './header.css';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <header className="header">
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          {/* ========== LOGO ========== */}
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          {/* ========================== */}

          <div className="nav__right d-flex align-items-center">
            <div className="nav__btns d-flex align-items-center gap-2">
              {user ? (
                <>
                  <h5 className="mb-0">{user.username}</h5>
                  <Button className="btn btn-dark" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button className="btn secondary__btn">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="btn primary__btn">
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
