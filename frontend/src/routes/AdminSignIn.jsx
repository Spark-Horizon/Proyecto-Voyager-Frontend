import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomNavbar } from '../components/CustomNavbar';
import { CustomButton } from '../components/CustomButton';
import { useAuth } from '../hooks/AuthContext';

import '../styles/forms.css'
import '../styles/buttons.css'
import '../styles/adminStyles.css'

export const AdminSignIn = () => {

  // Estados del componente
  const [Aemail, setAEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signin } = useAuth()

  // Funcionalidades del componente
  async function handleSignIn(e) {
    e.preventDefault();
    try{
      await signin(Aemail, password);
    } catch {
      setError('Correo o contraseña incorrectos');
    }
  };
  
  return (
    <div id="adminSignInPage">
      <CustomNavbar/>

      <section id="adminSignInForm" className='container-cc'>

        <form id='adminSInForm'>

          <div className="text-center mb-4">
            <h3 className="mb-0">Iniciar sesión</h3>
            <span>Ingresa tus datos para acceder</span>
            {error && <div className="text-danger">{error}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="text-center">Email</label>
            <input type="email" id="email" value={Aemail} onChange={(e) => setAEmail(e.target.value)} className="form-control" placeholder="your.email@gmail.com" required />
          </div>

          <div className="form-group mt-4">

            <label htmlFor="password" className="text-center">Contraseña</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="**********" required />

            <div className="text-start mt-2">
              <Link to='/resetPassword' className="text-primary text-decoration-none fs-7">Olvidé mi contraseña</Link>
            </div>

            <CustomButton
              type={'btn mt-3 btn-primary btnPrimary'}
              text={'Iniciar sesión'}
              func={handleSignIn}/>
          </div>

        </form>

      </section>
    </div>
  );
};