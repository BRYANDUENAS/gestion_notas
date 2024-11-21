// src/pages/Home.jsx
import { FaBell, FaUser } from 'react-icons/fa';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import logo from '../assets/img/logo.png';
import './../App.css';

export default function Home() {

  const nombreUsuario = "Juan Pérez";
  const cedulaUsuario = "1723456789";
  const correoUsuario = "juan.perez@example.com";

  return (

    <div style={{ width: '100%' }}>
      <main style={{ display: 'flex', padding: '20px' }}>
        {/* Columna Izquierda */}
        <div style={{ flex: 1, marginRight: '20px' }}>
          {/* Tarjeta 1 */}
          <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', marginBottom: '20px' }}>
            <img src={logo} alt="Logo de la institución" style={{ display: 'block', margin: '0 auto 10px', width: '100px' }} />
            <h3 style={{ textAlign: 'center' }}>Nombre de la Institución</h3>
            <p><strong>Ciudad:</strong> Quito</p>
            <p><strong>Dirección de la Institución:</strong> Av. Siempre Viva 123</p>
            <p><strong>Teléfono:</strong> +593 2 345 6789</p>
            <p><strong>Año Lectivo:</strong> 2024</p>
          </div>

          {/* Tarjeta 2 */}
          <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', marginBottom: '20px' }}>
            <h3>Datos Personales</h3>
            <p><strong>Nombre:</strong> {nombreUsuario}</p>
            <p><strong>Cédula:</strong> {cedulaUsuario}</p>
            <p><strong>Correo:</strong> {correoUsuario}</p>
          </div>

          {/* Tarjeta 3 */}
          <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px' }}>
            <h3>Información Adicional</h3>
            <p>Esta es una tarjeta libre donde se puede incluir otra información relevante, como horarios, anuncios, etc.</p>
          </div>
        </div>

        {/* Columna Derecha */}
        <div style={{ display: 'flex', justifyContent: 'center' , alignItems:'center'}}>
          <Calendar/>
        </div>
      </main>
    </div>
  );
}
