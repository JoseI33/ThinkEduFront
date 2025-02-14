import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const subjectsList = [
  { name: "mathematics", label: "Matematicas" },
  { name: "languageAndLiterature", label: "Literatura" },
  { name: "biology", label: "Biología" },
  { name: "physics", label: "Fisica" },
  { name: "chemistry", label: "Química" },
  { name: "economics", label: "Economía" },
  { name: "geography", label: "Geografía" },
  { name: "history", label: "Historia" },
  { name: "physicalEducation", label: "Educación Fisica" },
];

const StudentAssignmentsModal = ({ show, handleClose, student, saveAssignments, refreshStudentsData, editAssignments }) => {
  const [assignments, setAssignments] = useState([]);
  const studentHasAssignments = useMemo(() => student?.assignments?.length > 0, [student]);

  useEffect(() => {
    if (student) {
      if (studentHasAssignments) {
        // Map through student.assignments and structure the data accordingly
        const updatedAssignments = student.assignments.map((assignment) => {
          return {
            degree: assignment.degree,
            id: assignment._id,

            ...subjectsList.reduce((acc, subject) => {
              // Get the corresponding subject value from the nested `subjects` object
              const subjectKey = subject.name.charAt(0).toUpperCase() + subject.name.slice(1); // Capitalize first letter
              acc[subject.name] = assignment.subjects?.[subjectKey] || ""; // Set to empty string if no value
              return acc;
            }, {}),
          };
        });
        setAssignments(updatedAssignments);
      } else if (student.degree) {
        // If no assignments, create default ones based on degree with empty values
        const newAssignments = Array.from({ length: student.degree }, (_, i) => ({
          degree: i + 1,
          ...Object.fromEntries(subjectsList.map((subject) => [subject.name, ""])) // Set empty values for subjects
        }));
        setAssignments(newAssignments);
      }
    }
  }, [student, studentHasAssignments]);

  const handleChange = (index, subject, value) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index][subject] = value;
    setAssignments(updatedAssignments);
  };

  const handleSubmit = async() => {
try{
  let formattedData = [];

  if (!studentHasAssignments) {
    // Prepare new assignments data for save
    formattedData = assignments.map((assignment) => ({
      student: student._id,
      degree: assignment.degree,
      subjects: Object.fromEntries(
        subjectsList.map((subject) => [
          subject.name.charAt(0).toUpperCase() + subject.name.slice(1), // Ensure capitalizing the first letter
          assignment[subject.name],
        ])
      )
    }));
   await saveAssignments(formattedData);
   toast.success("Materias creadas con exito", {position: 'bottom-right'});
  } else {
    formattedData = assignments.map((assignment) => ({
      id: assignment.id,
      student: student._id,
      degree: assignment.degree,
      subjects: Object.fromEntries(
        subjectsList.map((subject) => [
          subject.name.charAt(0).toUpperCase() + subject.name.slice(1),
          assignment[subject.name],
        ])
      )
    }));
    await editAssignments(formattedData)
    toast.success("Materias editadas con exito", {position: 'bottom-right'});
  }

 await refreshStudentsData();
}catch(err){
toast.error("Error al administrar las materias", {position: 'bottom-right'});
}
handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Gestionar Asignaturas</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
        {assignments.length > 0 && assignments.map((assignment, index) => (
          <div key={index} className="mb-3">
            <h5>Año de cursada {assignment.degree}</h5>
            {subjectsList.map((subject) => (
              <Form.Group key={subject.name} className="mb-2">
                <Form.Label>{subject.label}</Form.Label>
                <Form.Control
                  type="number"
                  value={assignment[subject.name] || ""} // Ensure value is empty when no value is set
                  onChange={(e) =>
                    handleChange(index, subject.name, e.target.value) // Pass 'name' for update
                  }
                />
              </Form.Group>
            ))}
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentAssignmentsModal;
