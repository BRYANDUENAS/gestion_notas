import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './../assets/css/login.css';
import appFirebase from './../credenciales';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import logo from './../assets/img/logo.png';

const auth = getAuth(appFirebase);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Usa el hook useNavigate

  useEffect(() => {

  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const funAuth = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contrasenia = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, correo, contrasenia);
      console.log('Inicio de sesión exitoso');
      navigate('/home'); // Redirige a la página de inicio
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <div className="login-container d-flex min-vh-100 justify-content-center align-items-center" style={{ width: '100%' }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo Empresa" style={{ maxWidth: '100px', height: 'auto' }} />
        </div>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={funAuth}>
          <div className="mb-3 position-relative">
            <FontAwesomeIcon icon={faUser} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <input id="email" type="text" className="form-control ps-5" placeholder="Ingresa tu usuario" />
          </div>
          <div className="mb-3 position-relative">
            <FontAwesomeIcon icon={faLock} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <input id="password" type={showPassword ? 'text' : 'password'} className="form-control ps-5" placeholder="Ingresa tu contraseña" />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">Recuérdame</label>
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#1F2937', borderColor: '#1F2937' }}>Ingresar</button>
        </form>
      </div>
    </div>
  );
}
