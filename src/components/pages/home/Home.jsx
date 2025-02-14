import React from "react";
import { Container, Table } from "react-bootstrap";
import ColorSchemesExample from "./Navbarhome";
import { useMemo } from "react";
import { getUserData } from "../../../utils/common";

function Home() {
const userData = useMemo(()=> getUserData(),[])
const correInstitucion = useMemo(()=> {
  const nombreInstitucion = userData?.teacherData?.nameInstitution
  const nombre = userData?.teacherData?.name
  const apellido = userData?.teacherData?.lastName
  if (nombreInstitucion && nombre && apellido) return `${nombre.toLowerCase()}${apellido.toLowerCase()}@${nombreInstitucion.split(' ').join('').toLowerCase()}.com`
  else return ''
} ,[userData])
  return (
    <>
      <ColorSchemesExample />
      <Container className="mb-4">
        <h1 className="text-center">Inicio</h1>
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                <td>Nombre:</td>
                <td>{userData?.teacherData?.name || ''}</td>
              </tr>
              <tr>
                <td>Apellido:</td>
                <td>{userData?.teacherData?.lastName || ''}</td>
              </tr>
              <tr>
                <td>Fecha de Ingreso:</td>
                <td>{userData?.createdAt || ''}</td>
              </tr>
              <tr>
                <td>Contacto:</td>
                <td>{userData?.email || ''}</td>
              </tr>
              <tr>
                <td>ID:</td>
                <td>{userData?.id || ''}</td>
              </tr>
              <tr>
                <td>Nombre de Institución:</td>
                <td>{userData?.teacherData?.nameInstitution || ''}</td>
              </tr>
              <tr>
                <td>Contacto de Institución:</td>
                <td>{correInstitucion}</td>
              </tr>
              <tr>
                <td>Dirección:</td>
                <td>{userData?.teacherData?.address || ''}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default Home;
