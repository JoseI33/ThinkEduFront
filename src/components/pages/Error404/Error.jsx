import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Error404 = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} className="text-center">
          <h1>¡Error 404!</h1>
          <Link className="nav-link text-white" to="/Home">¡Error 404!</Link>
          <p>La página que buscas no existe.</p>
          <img 
            src="https://media2.giphy.com/media/xUNd9AWlNxNgnxiIxO/giphy.gif?cid=ecf05e47mb6whhwq43qqqp1jcy9inzeyvuslpqbqqyfvwsxf&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Error 404"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;
