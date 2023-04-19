import { useState } from 'react';
import { NavbarBasic } from '../components/navbars/NavbarBasic';
import { CustomButton } from '../components/buttons/indexButtons';

import '../styles/forms.css'

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    alert('FUNCIONA!');
  };

  return (
    <div>
      <NavbarBasic />

      <section id="signInForm" className='container-cc'>

        <form>

          <div className="text-center mb-4">
            <h2 className="h3 mb-0">Iniciar sesión</h2>
            <span>Ingresa tus datos para acceder</span>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="text-center">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="your.email@tec.mx" required />
          </div>

          <div className="form-group mt-4">

            <label htmlFor="password" className="text-center">Contraseña</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="**********" required />

            <div className="text-start mt-2">
              <a href="/landing" className="text-primary text-decoration-none fs-7">Olvidé mi contraseña</a>
            </div>
            <CustomButton type={'btn mt-3 btnPrimary'} text={'Iniciar Sesión'} func={handleSignIn}></CustomButton>

          </div>

          <div className="text-center mt-5">
            <span>¿No tienes una cuenta?</span>
            <CustomButton type={'btn mt-3 btnSecondary'} text='Registrate' func={() => window.location.replace('/signup')}></CustomButton>
          </div>

        </form>

      </section>
    </div>
  );
};