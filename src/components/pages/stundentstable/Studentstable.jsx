import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import ColorSchemesExample3 from "./NavbarStudent";
import useStudentsTable from "./hooks/useStudentsTable";
import StudentModal from "./StudentModal";
import { createNewStudent, editStudent } from "../../../utils/common"; // Import API functions
import { studentDataInitialValues } from "../../../common/initialStates";

function Studentstable() {
  const { studentsData, refreshStudentsData } = useStudentsTable();
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student for editing
  const [studentData, setStudentData] = useState(studentDataInitialValues);

  const handleCloseModal = () =>{
    setShowModal(false)
    setStudentData(studentDataInitialValues)
  }

  const handleOpenModal = (student = null) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  return (
    <>
      <ColorSchemesExample3 />
      <Container className="mt-4">
        <h1>Lista de Alumnos</h1>
        <div className="d-flex justify-content-end w-100 mb-3">       
  <Button 
    variant="success" 
    onClick={() => handleOpenModal()}
  >
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
                      <span
                        style={{ color: student.paymentState ? "green" : "orange" }}
                      >
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
      </Container>
    </>
  );
}

export default Studentstable;
