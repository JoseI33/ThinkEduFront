import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { PiBrain } from "react-icons/pi";
import { NavLink } from "react-router-dom";

function AboutusNavbar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#9977AA" }} variant="dark">
        <Container>
          <Navbar.Brand>
            <NavLink className="nav-link active text-white" to="/Home">
              <PiBrain size="2rem" className="mb-2" /> ThinkEdu
            </NavLink>
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AboutusNavbar;
