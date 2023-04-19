import { useState } from 'react';
import { NavbarBasic } from '../components/navbars/NavbarBasic';
import { CustomButton } from '../components/buttons/indexButtons';

import '../styles/forms.css'
import '../styles/buttons.css'

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    window.location.replace('/studentPage');
  };

  return (
    <div>
      <NavbarBasic />

      <section id="signInForm" className='container-cc'>

        <form>

          <div className="text-center mb-4">
            <h3 className="mb-0">Iniciar sesión</h3>
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
              <a href="/resetPassword" className="text-primary text-decoration-none fs-7">Olvidé mi contraseña</a>
            </div>

            <CustomButton type={'btn mt-3 btnPrimary'} text={'Iniciar Sesión'} func={handleSignIn}></CustomButton>

          </div>

          <div className="text-center mt-5">

            <span>¿No tienes una cuenta?</span>

            <CustomButton type={'btn mt-3 btnSecondary'} text='Registrate' func={() => window.location.replace('/signup')}></CustomButton>
          
          </div>

          <div className="select next-back mt-5">
                <CustomButton
                  type={'btn mt-3 btnPrimary'}
                  text={'Regresar a inicio'}
                  func={() => window.location.replace('/landing')}/>
          </div>

        </form>

      </section>
    </div>
  );
};