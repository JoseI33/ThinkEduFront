import React from "react";
import { Modal, Button } from "react-bootstrap";

function StudentChangeStateModal({ show, handleClose, student, handleStateChange }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro que quieres {student?.active ? "desactivar" : "activar"} este alumno?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant={student?.active ? "danger" : "success"} onClick={handleStateChange}>
          {student?.active ? "Desactivar" : "Activar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StudentChangeStateModal;
