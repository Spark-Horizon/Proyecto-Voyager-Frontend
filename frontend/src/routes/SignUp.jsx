import { useState } from 'react';
import { NavbarBasic } from '../components/navbars/NavbarBasic';

export const SignUp = () => {
  const [name, setName] = useState('');
  const [lastName1, setLastName1] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    alert('FUNCIONA');
  };

  return (
    <div>
      <NavbarBasic />
      <section className="sign-up">
        <div className="container d-flex justify-content-center align-items-center vh-90">
          <div className="card">
            <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h1 className="h3 mb-0">Registro de estudiante</h1>
                  <p className="lead">Por favor ingresa la siguiente información</p>
                </div>
              <form>
                <div className="form-group mb-4">
                  <label htmlFor="name" className="text-center fs-4">Nombre completo</label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Nombre completo" required />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="last-name-1" className="text-center fs-4">Primer apellido</label>
                  <input type="text" id="last-name-1" value={lastName1} onChange={(e) => setLastName1(e.target.value)} className="form-control" placeholder="Apellido paterno" required />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="last-name-2" className="text-center fs-4">Segundo apellido</label>
                  <input type="text" id="last-name-2" value={lastName2} onChange={(e) => setLastName2(e.target.value)} className="form-control" placeholder="Apellido materno" required />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password" className="text-center fs-4">Contraseña</label>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Contraseña" required />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="confirm-password" className="text-center fs-4">Confirmar contraseña</label>
                  <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" placeholder="Confirmar contraseña" required />
                </div>
                <div className="form-group mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value={terms} onChange={(e) => setTerms(e.target.checked)} id="terms" />
                    <label className="form-check-label" htmlFor="terms">
                      Acepto los términos y condiciones
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block d-flex justify-content-center align-items-center" onClick={handleSignUp} disabled={!terms} style={{ width: '100%' }}>
                  <span className="fs-5">Registrarse</span>
                </button>
              </form>
            </div>
          </div>
        </div>
     </section>    
    </div>     
  );
};