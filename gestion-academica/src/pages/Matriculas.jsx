import React, { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import appFirebase from './../credenciales';

export default function Matriculas() {
  const [estudiante, setEstudiante] = useState({
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    edad: "",
    curso: "",
    paralelo: "",
    nota:"",
  });

  const [representante, setRepresentante] = useState({
    nombres: "",
    apellidos: "",
    celular: "",
    correo: "",
  });

  const db = getFirestore(appFirebase);

  const handleInputChange = (event, section) => {
    const { name, value } = event.target;
    if (section === "estudiante") {
      setEstudiante({ ...estudiante, [name]: value });
    } else if (section === "representante") {
      setRepresentante({ ...representante, [name]: value });
    }
  };

  const guardar = async (e) => {
    e.preventDefault(); // Evitar que el formulario recargue la página
  
    // Estructura de periodos y parciales
    const periodos = {
      trimestre_1: ["examen", "leccion", "pruebas", "talleres"],
      trimestre_2: ["examen", "leccion", "pruebas", "talleres"],
      trimestre_3: ["examen", "leccion", "pruebas", "talleres"],
    };
  
    try {
      // Iterar sobre cada periodo y sus parciales
      for (const [periodo, parciales] of Object.entries(periodos)) {
        for (const parcial of parciales) {
          // Crear el objeto `data` con la estructura adecuada
          const data = {
            estudiante: {
              ...estudiante,
              periodo: periodo, // Establecer el periodo actual
              parcial: parcial, // Establecer el parcial actual
            },
            representante,
          };
  
          // Guardar en la colección
          const coleccionGuardar = collection(db, "notas_estudiantes");
          await addDoc(coleccionGuardar, data);
        }
      }
  
      console.log("Matrículas guardadas con éxito");
      // Limpiar el formulario después de guardar
      setEstudiante({
        nombres: "",
        apellidos: "",
        fechaNacimiento: "",
        edad: "",
        curso: "",
        paralelo: "",
        nota:"",
      });
      setRepresentante({
        nombres: "",
        apellidos: "",
        celular: "",
        correo: "",
      });
    } catch (error) {
      console.error("Error al guardar la matrícula:", error);
    }
  };
  
  return (
    <div className="container mt-4">
      <Card>
        <Card.Header className="text-center">
          <h4>Formulario de Matrículas</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={guardar}>
            <Row>
              {/* Columna izquierda: Datos del estudiante */}
              <Col md={6}>
                <h5 className="mb-3">Datos del Estudiante</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombres"
                    value={estudiante.nombres}
                    onChange={(e) => handleInputChange(e, "estudiante")}
                    placeholder="Ingrese nombres"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    value={estudiante.apellidos}
                    onChange={(e) => handleInputChange(e, "estudiante")}
                    placeholder="Ingrese apellidos"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaNacimiento"
                    value={estudiante.fechaNacimiento}
                    onChange={(e) => handleInputChange(e, "estudiante")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    type="number"
                    name="edad"
                    value={estudiante.edad}
                    onChange={(e) => handleInputChange(e, "estudiante")}
                    placeholder="Ingrese edad"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Curso</Form.Label>
                  <Form.Select
                    name="curso"
                    value={estudiante.curso}
                    onChange={(e) => handleInputChange(e, "estudiante")}
                  >
                    <option value="">Seleccione un curso</option>
                    <option value="octavo">Octavo</option>
                    <option value="noveno">Noveno</option>
                    <option value="decimo">Décimo</option>
                    <option value="primero_bgu">Primero BGU</option>
                    <option value="segundo_bgu">Segundo BGU</option>
                    <option value="tercero_bgu">Tercero BGU</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Paralelo</Form.Label>
                  <Form.Select
                    name="paralelo"
                    value={estudiante.paralelo}
                    onChange={(e) => handleInputChange(e, "estudiante")}
                  >
                    <option value="">Selecciona un paralelo</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Columna derecha: Datos del representante */}
              <Col md={6}>
                <h5 className="mb-3">Datos del Representante</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombres"
                    value={representante.nombres}
                    onChange={(e) => handleInputChange(e, "representante")}
                    placeholder="Ingrese nombres del representante"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    value={representante.apellidos}
                    onChange={(e) => handleInputChange(e, "representante")}
                    placeholder="Ingrese apellidos del representante"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    type="tel"
                    name="celular"
                    value={representante.celular}
                    onChange={(e) => handleInputChange(e, "representante")}
                    placeholder="Ingrese número de celular"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="correo"
                    value={representante.correo}
                    onChange={(e) => handleInputChange(e, "representante")}
                    placeholder="Ingrese correo electrónico"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center mt-4">
              <Button variant="primary" type="submit">
                Guardar Matrícula
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
