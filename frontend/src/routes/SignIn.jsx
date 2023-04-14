import { useState } from 'react';
import { NavbarBasic } from '../components/navbars/NavbarBasic';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    alert('FUNCIONA!');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    alert('FUNCIONA!');
  };

  return (
    <div>
      <NavbarBasic />
      <section className="sign-in">
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card">
            <div className="card-body p-5">
              <form>
                <div className="form-group">
                  <label htmlFor="email" className="text-center fs-4">Email</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" required />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="password" className="text-center fs-4">Contraseña</label>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Contraseña" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4 d-flex justify-content-center align-items-center" onClick={handleSignIn} style={{ width: '100%' }}>
                  <span className="fs-5">Iniciar sesión</span>
                </button>
              </form>
              <div className="text-center mt-4">
                <span className="fs-5">¿No estás registrado?</span>
              </div>
              <button type="button" className="btn btn-outline-secondary mx-auto mt-3 w-100" onClick={handleSignUp}>
                <span className="fs-5">Crear cuenta</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};