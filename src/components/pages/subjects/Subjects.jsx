import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import ColorSchemesExample2 from "./NavbarSubject";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../../utils/common";

function Subjects() {
  const { id } = useParams(); // Get the student id from the route params
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch student data by id
    const fetchStudent = async () => {
      try {
        const studentData = await getStudentById(id);
        setStudent(studentData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) {
    return <div>Loading student data...</div>;
  }

  const subjects = {
    Mathematics:"Matemáticas",
    LanguageAndLiterature:"Lengua y Literatura",
    Biology:"Biología",
    Physics: "Física",
    Chemistry: "Química",
    Economics: "Economía",
    Geography: "Geografía",
    History: "Historia",
    PhysicalEducation:"Educación Física",
};

  const generateGradeForDegree = (degree, subject) => {
    // Find the assignment corresponding to the degree
    const assignment = student.assignments.find(
      (assignment) => assignment.degree === degree
    );
    // Return the grade for the subject, or "No grade" if not found
    return assignment ? assignment.subjects[subject] : "No grade";
  };

  return (
    <div>
      <ColorSchemesExample2 />
      <h3>Alumno: {student.name} {student.lastName}</h3>

      <Accordion defaultActiveKey="0">
        {student.assignments.map((assignment, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>Año {assignment.degree}</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Materia</th>
                    <th>Nota Final</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(subjects).map((subject, subjectIndex) => (
                    <tr key={subjectIndex}>
                      <td>{subjects[subject]}</td>
                      <td>{generateGradeForDegree(assignment.degree, subject)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default Subjects;
