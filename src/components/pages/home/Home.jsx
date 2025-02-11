import React from "react";
import { Container, Table } from "react-bootstrap";
import ColorSchemesExample from "./Navbarhome";

function Home() {
  return (
    <>
      <ColorSchemesExample />
      <Container className="mb-4">
        <h1 className="text-center">Administración</h1>
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                <td>Nombre:</td>
                <td>John</td>
              </tr>
              <tr>
                <td>Apellido:</td>
                <td>Doe</td>
              </tr>
              <tr>
                <td>Fecha de Ingreso:</td>
                <td>01/01/2023</td>
              </tr>
              <tr>
                <td>Contacto:</td>
                <td>john@example.com</td>
              </tr>
              <tr>
                <td>ID:</td>
                <td>12345</td>
              </tr>
              <tr>
                <td>Nombre de Institución:</td>
                <td>Institución XYZ</td>
              </tr>
              <tr>
                <td>Contacto de Institución:</td>
                <td>contacto@institucion.com</td>
              </tr>
              <tr>
                <td>Dirección:</td>
                <td>123 Calle Principal</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default Home;
