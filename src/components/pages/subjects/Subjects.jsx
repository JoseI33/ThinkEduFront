import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import ColorSchemesExample2 from "./NavbarSubject";

function Subjects() {
  const years = [1, 2, 3, 4];
  const subjects = [
    "Matemáticas",
    "Lengua y Literatura",
    "Biología",
    "Física",
    "Química",
    "Economía",
    "Geografía",
    "Historia",
    "Educación Física",
  ];

  const generateRandomGrade = () => {
    return (Math.random() * 7 + 4).toFixed(1);
  };

  return (
    <div>
      {/* Agrega ColorSchemesExample2 aquí */}
      <ColorSchemesExample2 />

      {/* Agrega el título "Alumno Lionel Messi" */}
      <h3>Alumno: Lionel Andres Messi 🐐</h3>

      <Accordion defaultActiveKey="0">
        {years.map((year, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>Año {year}</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Materia</th>
                    <th>Nota Final</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, subjectIndex) => (
                    <tr key={subjectIndex}>
                      <td>{subject}</td>
                      <td>{generateRandomGrade()}</td>
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
