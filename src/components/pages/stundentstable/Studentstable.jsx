import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import ColorSchemesExample3 from "./NavbarStudent";
import useStudentsTable from "./hooks/useStudentsTable";
import StudentModal from "./StudentModal";
import StudentAssignmentsModal from "./StudentAssignmentsModal";
import StudentChangeStateModal from "./StudentChangeStateModal";
import { createNewStudent, editStudent, createAssignments, editAssignments, changeStudentState } from "../../../utils/common";
import { studentDataInitialValues } from "../../../common/initialStates";
import "bootstrap-icons/font/bootstrap-icons.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Studentstable() {
  const { studentsData, refreshStudentsData } = useStudentsTable();
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentData, setStudentData] = useState(studentDataInitialValues);


  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedStudentForAssignments, setSelectedStudentForAssignments] = useState(null);


  const [showActivationModal, setShowActivationModal] = useState(false);
  const [studentToActivate, setStudentToActivate] = useState(null);
  const navigate = useNavigate();

  const handleNavigateToSubjects = (studentId) => {
    navigate(`/Subjects/${studentId}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStudentData(studentDataInitialValues);
  };

  const handleOpenModal = (student = null) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  // Handle Assignment Modal
  const handleOpenAssignmentModal = (student) => {
    setSelectedStudentForAssignments(student);
    setShowAssignmentModal(true);
  };

  const handleCloseAssignmentModal = () => {
    setShowAssignmentModal(false);
    setSelectedStudentForAssignments(null);
  };


  const handleOpenActivationModal = (student) => {
    setStudentToActivate(student);
    setShowActivationModal(true);
  };

  const handleCloseActivationModal = () => {
    setShowActivationModal(false);
    setStudentToActivate(null);
  };

  const handleStudentStateChange = async () => {
    try{

      if (studentToActivate) {
        const newState = !studentToActivate.active;
        await changeStudentState({ estado: newState }, studentToActivate._id);
        await refreshStudentsData();
        toast.success("Cambiado el estado del alumno correctamente", {position: 'bottom-right'});
      }
    }catch(err){
      toast.error("Error al cambiar el estado del alumno", {position: 'bottom-right'});
    }
    handleCloseActivationModal();
  };

  return (
    <>
      <ColorSchemesExample3 />
      <Container className="mt-4">
        <h1>Lista de Alumnos</h1>
        <div className="d-flex justify-content-end w-100 mb-3">       
          <Button variant="success" onClick={() => handleOpenModal()}>
            Crear Alumno Nuevo
          </Button>
        </div>

        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre Apellido</th>
                <th>Año de cursado actual</th>
                <th>Numero Expediente (ID)</th>
                <th>Cuota al día</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.length > 0 &&
                studentsData.map((student) => (
                  <tr key={student._id}>
                    <td className="text-nowrap">
                      {student.name} {student.lastName}
                    </td>
                    <td>{student.degree}</td>
                    <td>{student._id}</td>
                    <td>
                      <span style={{ color: student.paymentState ? "green" : "orange" }}>
                        {student.paymentState ? "Sí" : "No"}
                      </span>
                    </td>
                    <td>
                    <div className="d-flex justify-content-center gap-2">
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={`tooltip-edit-${student._id}`}>Editar Alumno</Tooltip>}
    >
      <Button
        variant="primary"
        size="sm"
        onClick={() => handleOpenModal(student)}
        className="d-flex align-items-center"
      >
        <i className="bi bi-pencil text-white"></i>
      </Button>
    </OverlayTrigger>

    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={`tooltip-assignments-${student._id}`}>Materias</Tooltip>}
    >
      <Button
        variant="info"
        size="sm"
        onClick={() => handleOpenAssignmentModal(student)}
        className="d-flex align-items-center"
      >
        <i className="bi bi-book text-white"></i>
      </Button>
    </OverlayTrigger>

    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`tooltip-toggle-${student._id}`}>
          {student.active ? "Desactivar Alumno" : "Activar Alumno"}
        </Tooltip>
      }
    >
      <Button
        variant={student.active ? "success" : "danger"}
        size="sm"
        onClick={() => handleOpenActivationModal(student)}
        className="d-flex align-items-center"
      >
        <i className={`bi ${student.active ? "bi-toggle-on" : "bi-toggle-off"} text-white`}></i>
      </Button>
    </OverlayTrigger>
    <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-view-${student._id}`}>Ver Materias</Tooltip>}
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleNavigateToSubjects(student._id)}
            className="d-flex align-items-center"
          >
            <i className="bi bi-eye text-white"></i>
          </Button>
        </OverlayTrigger>
  </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>

        <StudentModal
          show={showModal}
          handleClose={handleCloseModal}
          selectedStudent={selectedStudent}
          createNewStudent={createNewStudent}
          editStudent={editStudent}
          refreshStudentsData={refreshStudentsData}
          setStudentData={setStudentData}
          studentData={studentData}
        />

        <StudentAssignmentsModal
          saveAssignments={createAssignments}
          show={showAssignmentModal}
          handleClose={handleCloseAssignmentModal}
          student={selectedStudentForAssignments}
          refreshStudentsData={refreshStudentsData}
          editAssignments={editAssignments}
        />

        <StudentChangeStateModal
          show={showActivationModal}
          handleClose={handleCloseActivationModal}
          student={studentToActivate}
          handleStateChange={handleStudentStateChange}
        />
      </Container>
    </>
  );
}

export default Studentstable;
