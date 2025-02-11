import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import instance from "../../../../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (formData.username.trim() === "") {
      newErrors.username = "Usuario es requerido";
      valid = false;
    } else {
      newErrors.username = "";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Contraseña es requerida";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const user = {
          email: formData.username,
          password: formData.password,
        };

        const res = await instance.post("/login", user);
        const user_token = res.data.token;
        const userData = res.data
        localStorage.setItem("token", user_token);
        localStorage.setItem("userData", userData);

        navigate("/Home");
      } catch (error) {
        console.log(error);

        alert("Inicio de sesión fallido. Verifica tus credenciales.");
      }
    } else {
      console.log("El formulario contiene errores");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6} className="login-container">
            <h2 className="mb-4">Iniciar sesión</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Ingresa tu usuario"
                  value={formData.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              

              <Button 
                variant="primary"
                type="submit"
                className="mr-2"
                size="sm"
              >
                Iniciar sesión
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
