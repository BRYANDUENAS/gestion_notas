// src/components/Layout.jsx
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width:'100%' }}>
      {/* Header global */}
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar global */}
        <Sidebar />
        {/* Contenido principal */}
        <div style={{ marginLeft: '200px', width: '100%', padding: '20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
