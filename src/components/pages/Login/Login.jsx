import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import instance from "../../../../api/axios";
import { createAccount } from "../../../utils/common";

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

  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
    lastName: "",
    telefono: "",
    nameInstitution: "",
    address: "",
  });

  const [registerErrors, setRegisterErrors] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
    lastName: "",
    telefono: "",
    nameInstitution: "",
    address: "",
  });
  
  const validateRegisterForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      username: "",
      password: "",
      name: "",
      lastName: "",
      telefono: "",
      nameInstitution: "",
      address: "",
    };
  
    Object.keys(registerData).forEach((key) => {
      if (registerData[key].trim() === "") {
        newErrors[key] = "Este campo es obligatorio";
        valid = false;
      }
    });
  
    setRegisterErrors(newErrors);
    return valid;
  };
  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (validateRegisterForm()) {
      try {
        await createAccount(registerData);
        toast.success("Cuenta creada con éxito. Ahora puedes iniciar sesión.", {position: 'bottom-right'});
        setShowRegister(false);
      } catch (error) {
        toast.error("Error al registrar la cuenta. Inténtalo de nuevo.", {position: 'bottom-right'});
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (formData.username.trim() === "") {
      newErrors.username = "Usuario es requerido";
      valid = false;
    }
    if (formData.password.trim() === "") {
      newErrors.password = "Contraseña es requerida";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const user = { email: formData.username, password: formData.password };
        const res = await instance.post("/login", user);
        const user_token = res.data.token;
        localStorage.setItem("token", user_token);
        localStorage.setItem("userData", JSON.stringify(res.data));

        toast.success("Inicio de sesión exitoso", {position: 'bottom-right'});
        navigate("/Home");
      } catch (error) {
        toast.error("Inicio de sesión fallido. Verifica tus credenciales.", {position: 'bottom-right'});
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
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
                  placeholder="Ingresa tu correo"
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

              <Button variant="primary" type="submit" size="sm">
                Iniciar sesión
              </Button>
              <Button
              size="sm"
              className="ml-4"
              type="button"
              onClick={() => setShowRegister(true)}
                      >
  Registrarse
</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      {/* Register Modal */}
      <Modal show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleRegisterSubmit}>
  <Form.Group controlId="registerEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control
      type="email"
      name="email"
      value={registerData.email}
      onChange={handleRegisterChange}
      isInvalid={!!registerErrors.email}
      required
    />
    <Form.Control.Feedback type="invalid">
      {registerErrors.email}
    </Form.Control.Feedback>
  </Form.Group>

  <Form.Group controlId="registerUsername">
    <Form.Label>Usuario</Form.Label>
    <Form.Control
      type="text"
      name="username"
      value={registerData.username}
      onChange={handleRegisterChange}
      isInvalid={!!registerErrors.username}
      required
    />
    <Form.Control.Feedback type="invalid">
      {registerErrors.username}
    </Form.Control.Feedback>
  </Form.Group>

  <Form.Group controlId="registerPassword">
    <Form.Label>Contraseña</Form.Label>
    <Form.Control
      type="password"
      name="password"
      value={registerData.password}
      onChange={handleRegisterChange}
      isInvalid={!!registerErrors.password}
      required
    />
    <Form.Control.Feedback type="invalid">
      {registerErrors.password}
    </Form.Control.Feedback>
  </Form.Group>

  <Form.Group controlId="registerName">
    <Form.Label>Nombre</Form.Label>
    <Form.Control
      type="text"
      name="name"
      value={registerData.name}
      onChange={handleRegisterChange}
      isInvalid={!!registerErrors.name}
      required
    />
    <Form.Control.Feedback type="invalid">
      {registerErrors.name}
    </Form.Control.Feedback>
  </Form.Group>

  <Form.Group controlId="registerLastName">
    <Form.Label>Apellido</Form.Label>
    <Form.Control
      type="text"
      name="lastName"
      value={registerData.lastName}
      onChange={handleRegisterChange}
      isInvalid={!!registerErrors.lastName}
      required
    />
    <Form.Control.Feedback type="invalid">
      {registerErrors.lastName}
    </Form.Control.Feedback>
  </Form.Group>

  <Form.Group controlId="registerTelefono">
    <Form.Label>Teléfono</Form.Label>
    <Form.Control
      type="text"
      name="telefono"
      value={registerData.telefono}
      onChange={handleRegisterChange}
      isInvalid={!!registerErrors.telefono}
      required
    />
    <Form.Control.Feedback type="invalid">
      {registerErrors.telefono}
    </Form.Control.Feedback>
  </Form.Group>

  <Form.Group controlId="registerInstitution">
    <Form.Label>Institución</Form.Label>
    <Form.Control
      type="text"
      name="nameInstitution"
      value={registerData.nameInstitution}
      onChange={handleRegisterChange}
      isInvalid={!!registerErrors.nameInstitution}
      required
    />
    <Form.Control.Feedback type="invalid">
      {registerErrors.nameInstitution}
    </Form.Control.Feedback>
  </Form.Group>

  <Form.Group controlId="registerAddress">
    <Form.Label>Dirección</Form.Label>
    <Form.Control
      type="text"
      name="address"
      value={registerData.address}
      onChange={handleRegisterChange}
      isInvalid={!!registerErrors.address}
      required
    />
    <Form.Control.Feedback type="invalid">
      {registerErrors.address}
    </Form.Control.Feedback>
  </Form.Group>

  <Button variant="primary" type="submit">
    Crear Cuenta
  </Button>
</Form>

        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
