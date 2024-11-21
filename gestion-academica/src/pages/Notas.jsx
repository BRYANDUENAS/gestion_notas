// src/pages/Notas.jsx
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFirestore, collection, getDocs,doc, updateDoc} from 'firebase/firestore';
import appFirebase from './../credenciales';

// Obtén la referencia a Firestore
const db = getFirestore(appFirebase);

export default function Notas() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [curso, setCurso] = useState('');
  const [paralelo, setParalelo] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [parcial, setParcial] = useState('');

  // Función para obtener los datos de Firestore
  const obtenerDatos = async () => {
    try {
      const coleccionRef = collection(db, "notas_estudiantes");
      const dataAlumnos = await getDocs(coleccionRef);
      const datos = dataAlumnos.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(datos);
      
      // Filtrar los datos en base a los valores de los selectores
      const datosFiltrados = datos.filter(estudiante => {
        return (
          (curso === '' || estudiante.estudiante.curso === curso) &&
          (paralelo === '' || estudiante.estudiante.paralelo === paralelo) &&
          (periodo === '' || estudiante.estudiante.periodo === periodo) &&
          (parcial === '' || estudiante.estudiante.parcial === parcial)
        );
      });
      setEstudiantes(datosFiltrados);
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
    }
  };

    // Función para manejar el cambio en los inputs de notas
    const handleNotaChange = (index, nuevaNota) => {
      const nuevosEstudiantes = [...estudiantes];
      nuevosEstudiantes[index].estudiante.nota = nuevaNota;
      setEstudiantes(nuevosEstudiantes);
    };

    const guardarDatos = async () => {
      try {
        for (const estudiante of estudiantes) {
          // Verifica que el documento tenga un ID antes de intentar actualizarlo
          if (estudiante.id) {
            const docRef = doc(db, "notas_estudiantes", estudiante.id); // Usa `doc()` en lugar de `.doc()`
            await updateDoc(docRef, {
              estudiante: {
                nombres: estudiante.estudiante.nombres,
                nota: estudiante.estudiante.nota,
                curso: curso,
                paralelo: paralelo,
                periodo: periodo,
                parcial: parcial,
              }
            });
          } else {
            console.warn(`El estudiante con nombre ${estudiante.estudiante.nombre} no tiene un ID válido.`);
          }
        }
        console.log("EXITO");
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
      }
    };


  // useEffect para cargar los datos al montar el componente y cuando los filtros cambian
  useEffect(() => {
    // Verifica que todos los selectores tengan un valor
    if (curso && paralelo && periodo && parcial) {
      obtenerDatos();
    } else {
      setEstudiantes([]); // Limpia el estado si los filtros no están completos
    }
  }, [curso, paralelo, periodo, parcial]);

  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <div className="container mt-4">
        <h1 className="mb-4">Notas Page</h1>
        {/* Fila de selectores */}
        <div className="row mb-4">
          <div className="col-md-3">
            <label htmlFor="curso" className="form-label">Curso</label>
            <select id="curso" className="form-select" onChange={(e) => setCurso(e.target.value)}>
              <option value="">Selecciona...</option>
              <option value="octavo">Octavo</option>
              <option value="noveno">Noveno</option>
              <option value="decimo">Décimo</option>
              <option value="primero_bgu">Primero BGU</option>
              <option value="segundo_bgu">Segundo BGU</option>
              <option value="tercero_bgu">Tercero BGU</option>
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="paralelo" className="form-label">Paralelo</label>
            <select id="paralelo" className="form-select" onChange={(e) => setParalelo(e.target.value)}>
              <option value="">Selecciona...</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="periodo" className="form-label">Periodo</label>
            <select id="periodo" className="form-select" onChange={(e) => setPeriodo(e.target.value)}>
              <option value="">Selecciona...</option>
              <option value="trimestre_1">Trimestre 1</option>
              <option value="trimestre_2">Trimestre 2</option>
              <option value="trimestre_3">Trimestre 3</option>
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="parcial" className="form-label">Parcial</label>
            <select id="parcial" className="form-select" onChange={(e) => setParcial(e.target.value)}>
              <option value="">Selecciona...</option>
              <option value="examen">Examen</option>
              <option value="leccion">Lección</option>
              <option value="pruebas">Prueba</option>
              <option value="talleres">Talleres</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover w-100">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "10%" }}>No</th>
                <th style={{ width: "80%" }}>Nombres</th>
                <th style={{ width: "10%" }}>Nota</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.length > 0 ? (
                estudiantes.map((estudiante, index) => (
                  <tr key={estudiante.id}>
                    <td>{index + 1}</td>
                    <td>{estudiante.estudiante.nombres}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={estudiante.estudiante.nota}
                        onChange={(e) => handleNotaChange(index, e.target.value)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">No hay datos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {estudiantes.length > 0 && (
        <button className="btn btn-success mb-3" onClick={guardarDatos}>
          Guardar Datos
        </button>)}
      </div>
    </div>
  );
}
