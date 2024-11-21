// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { FaHome, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import './../App.css'; // Archivo CSS para estilos específicos

export default function Sidebar() {
  return (
    <div className="sidebar" style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '20px', height: '100vh', position: 'fixed'}}>
      <h3>Menú</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <NavLink to="/home" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <FaHome style={{ marginRight: '10px' }} />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/notas" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <FaClipboardList style={{ marginRight: '10px' }} />
            Notas
          </NavLink>
        </li>
        <li>
          <NavLink to="/matriculas" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <FaClipboardList style={{ marginRight: '10px' }} />
            Matriculas
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <FaSignOutAlt style={{ marginRight: '10px' }} />
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
