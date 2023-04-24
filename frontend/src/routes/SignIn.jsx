import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomNavbar } from '../components/CustomNavbar';
import { CustomButton } from '../components/CustomButton';
import { useAuth } from '../hooks/AuthContext';

import '../styles/forms.css'
import '../styles/buttons.css'

export const SignIn = () => {

  // Estados del componente
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const { signin } = useAuth()

  // Funcionalidades del componente
  async function handleSignIn(e) {
    e.preventDefault();
    try{
      await signin(email, password);
      navigate('/home');
    } catch {
      setError('Incorrect email or password');
    }
  };
  const isEmailValid = () => {
    const tecMxEmailRegex = /^[\w-.]+@tec\.mx$/;
    return tecMxEmailRegex.test(email);
  };
  const isPasswordValid = () => {
    const passwordRegex = /^[\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,16}$/;
    return passwordRegex.test(password);
  };

  // Links y componentes de Navbar
  const links = [];
  const components = [];
  
  return (
    <div>
      <CustomNavbar links={links} components={components}/>

      <section id="signInForm" className='container-cc'>

        <form>

          <div className="text-center mb-4">
            <h3 className="mb-0">Iniciar sesión</h3>
            <span>Ingresa tus datos para acceder</span>
            {error && <div className="text-danger">{error}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="text-center">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="your.email@tec.mx" required />
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
              func={handleSignIn}
              disabled={!isPasswordValid() || !isEmailValid()}/>
          </div>

          <div className="text-center mt-3">
            <span>¿No tienes una cuenta?</span>
            <Link to='/signup'>
              <CustomButton 
                type={'btn mt-3 btnSecondary'} 
                text={'Registrate'}/>
            </Link>
          </div>

          <div className="select next-back mt-5">
            <Link to='/'>
              <CustomButton
                type={'btn mt-3 btnPrimary'}
                text={'Regresar a inicio'}/>
            </Link>
          </div>

        </form>

      </section>
    </div>
  );
};