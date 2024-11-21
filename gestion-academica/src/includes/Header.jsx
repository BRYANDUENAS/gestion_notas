// src/components/Header.jsx
import { FaBell, FaUser } from 'react-icons/fa';

export default function Header() {
  const nombreUsuario = "Juan Pérez"; // Esto puede venir de un contexto o props en el futuro

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
      <div>
        <h2>ADMINISTRATIVO</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaBell style={{ marginRight: '15px', fontSize: '20px' }} />
        <FaUser style={{ marginRight: '5px', fontSize: '20px' }} />
        <span>Usuario: {nombreUsuario}</span>
      </div>
    </header>
  );
}
