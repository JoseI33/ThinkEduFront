import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { PiBrain, PiStudentBold } from "react-icons/pi";
import { BiBookBookmark, BiHomeAlt2 } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useCallback } from "react";

function ColorSchemesExample2() {
    const navigate = useNavigate();
    const handleLogOut = useCallback(()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
      navigate('/')
    },[])
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#9977AA" }}
        variant="dark"
      >
        <Container>
          <NavLink className="nav-link active text-white " to="/Home" >
            {" "}
            <PiBrain size="2rem" className="mb-2" /> ThinkEdu
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              <NavLink className="nav-link active mx-2" to="/Home" >
                <BiHomeAlt2 size="2rem" className="mb-2" /> Home
              </NavLink>
              <NavLink className="nav-link active mx-2" to="/Studentstable" >
                {" "}
                <PiStudentBold size="2rem" className="mb-2" />
                Students
              </NavLink>
{/*               <NavLink className="nav-link active mx-2" to="/Subjects" >
                {" "}
                <BiBookBookmark size="2rem" className="mb-2" /> Subjects{" "}
              </NavLink> */}
            </Nav>
            <Nav>
              <div onClick={handleLogOut} className="nav-link active mx-2" to="/" style={{ cursor: "pointer" }}>
                <MdLogout onClick={handleLogOut} size="2rem" className="mb-2" />
                Logout
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample2;
