import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Footer = () => {
  return (
    <div className="footer d-flex justify-content-center align-items-center fixed-bottom text-center text-md-left">
      <footer style={{ backgroundColor: '#9977AA', color: 'white', width: '100%' }}>
        <Container>
          <Link className="nav-link text-white" to="/Aboutus">
            <p>© Copyright 2023 Eduthink - All Rights Reserved</p>
          </Link>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
