import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import ColorSchemesExample3 from "./NavbarStudent";
import useStudentsTable from "./hooks/useStudentsTable";
import StudentModal from "./StudentModal";
import StudentAssignmentsModal from "./StudentAssignmentsModal";
import { createNewStudent, editStudent, createAssignments, editAssignments } from "../../../utils/common"; // Import API functions
import { studentDataInitialValues } from "../../../common/initialStates";

function Studentstable() {
  const { studentsData, refreshStudentsData } = useStudentsTable();
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student for editing
  const [studentData, setStudentData] = useState(studentDataInitialValues);

  // State for Assignment Modal
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedStudentForAssignments, setSelectedStudentForAssignments] = useState(null);

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
                      <div className="d-flex flex-column">
                        <Button
                          variant="primary"
                          className="mb-2"
                          onClick={() => handleOpenModal(student)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="info"
                          onClick={() => handleOpenAssignmentModal(student)}
                        >
                          Materias
                        </Button>
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
      </Container>
    </>
  );
}

export default Studentstable;
