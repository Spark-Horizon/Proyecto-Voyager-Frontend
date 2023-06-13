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
      await signin(email.toLowerCase(), password);
      navigate('/home');
    } catch {
      setError('Correo o contraseña incorrectos');
    }
  };

  // Links y componentes de Navbar
  const navbar = {
    links: [],
    tabs: [],
    components: [
        {component: <Link to='/'><CustomButton type={'btn btn-sm btnPrimary'} text={'Regresar a inicio'}/></Link>}
    ]
  };
  
  return (
    <div>

      <section id="signInForm">
        
        <CustomNavbar tabs={navbar.tabs} links={navbar.links} components={navbar.components}/>
        
        <div className='startSection container-cc'>
          <div className="img">
              <img className='"img-fluid"' id='marsImage' src={require('../assets/img/image-mars.png')} alt="marsImage" />
          </div>
          <form className='custom-form'>

            <div className="form-group">
              <label htmlFor="email" className="text-center">Correo electrónico</label>
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
                func={handleSignIn}/>
                {error && <div className="text-danger">{error}</div>}
            </div>

            <div className="text-center mt-3">
              <span>¿No tienes una cuenta? </span>
              <Link className='text-primary text-decoration-none' to='/signup'>Registrate</Link>
            </div>

          </form>
        </div>

      </section>
      
    </div>
  );
};