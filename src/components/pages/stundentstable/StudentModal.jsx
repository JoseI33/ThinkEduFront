import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { studentDataInitialValues } from "../../../common/initialStates";
import { toast } from "react-toastify";


const StudentModal = ({ show, handleClose, selectedStudent, createNewStudent, editStudent, refreshStudentsData, studentData, setStudentData }) => {

  const [inputErrors, setInputErrors] = useState({});
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (selectedStudent) {
      console.log(selectedStudent);
      setStudentData(selectedStudent);
    } else {
      setStudentData({
        name: "",
        lastName: "",
        degree: "",
        _id: "",
        paymentState: true,
        telephone: "",
        address: "",
        age: "",
      });
    }
    setInputErrors({});
    setShowError(false);

  }, [selectedStudent]);

  const validateFields = () => {
    let errors = {};

    if (!studentData.name.trim()) errors.name = "El nombre es obligatorio.";
    if (!studentData.lastName.trim()) errors.lastName = "El apellido es obligatorio.";
    if (!studentData.degree) errors.degree = "Requerido";
    if (studentData.degree < 1 || studentData.degree > 5 ) errors.degree = "Ingrese un año del 1 al 5.";
    if (selectedStudent && Number(studentData.degree) < Number(selectedStudent.degree)) 
      errors.degree = "Debe ser mayor o igual al actual.";
    
    if (studentData.telephone && isNaN(studentData.telephone)) errors.telephone = "Ingrese un número válido.";
    if (studentData.age && (isNaN(studentData.age) || Number(studentData.age) < 0)) 
      errors.age = "Ingrese una edad válida.";

    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    try{
      if (!validateFields()) {
        setShowError(true);
        return;
      }
  
      if (selectedStudent) {
        await editStudent(studentData, selectedStudent._id);
        toast.success("Estudiante editado con exito", {position: 'bottom-right'});
      } else {
        await createNewStudent(studentData);
        toast.success("Estudiante creado con exito", {position: 'bottom-right'});
      }
      
      await refreshStudentsData();
      setStudentData(studentDataInitialValues)
    }
    catch(err){
      toast.error("Error al crear un estudiante", {position: 'bottom-right'});
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedStudent ? "Editar Alumno" : "Crear Alumno"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showError && Object.keys(inputErrors).length > 0 && (
          <Alert variant="danger" className="mb-3">
            Por favor, completa los campos obligatorios correctamente.
          </Alert>
        )}
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              isInvalid={!!inputErrors.name}
              placeholder="Nombre "
              value={studentData.name}
              onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">{inputErrors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              isInvalid={!!inputErrors.lastName}
              placeholder="Apellido "
              value={studentData.lastName}
              onChange={(e) => setStudentData({ ...studentData, lastName: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">{inputErrors.lastName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="degree">
            <Form.Label>Año de Cursado</Form.Label>
            <Form.Control
              type="number"
              isInvalid={!!inputErrors.degree}
              disabled={Boolean(selectedStudent)}
              placeholder="Año de cursado"
              value={studentData.degree}
              onChange={(e) => setStudentData({ ...studentData, degree: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">{inputErrors.degree}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="telephone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="number"
              isInvalid={!!inputErrors.telephone}
              placeholder="Teléfono "
              value={studentData.telephone}
              onChange={(e) => setStudentData({ ...studentData, telephone: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">{inputErrors.telephone}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dirección "
              value={studentData.address}
              onChange={(e) => setStudentData({ ...studentData, address: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="age">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              isInvalid={!!inputErrors.age}
              placeholder="Edad "
              value={studentData.age}
              onChange={(e) => setStudentData({ ...studentData, age: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">{inputErrors.age}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {selectedStudent ? "Guardar Cambios" : "Crear Alumno"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentModal;
