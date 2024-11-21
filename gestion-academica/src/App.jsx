// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Notas from './pages/Notas';
import Layout from './includes/Layout';
import Matriculas from './pages/Matriculas';

export default function App() {
  return (
    <Router>
      <Routes>        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
         {/* Rutas que usan el Layout con el Sidebar */}
         <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/notas" element={<Layout><Notas /></Layout>} />        
        <Route path="/matriculas" element={<Layout><Matriculas /></Layout>} />
      </Routes>
    </Router>
  );
}