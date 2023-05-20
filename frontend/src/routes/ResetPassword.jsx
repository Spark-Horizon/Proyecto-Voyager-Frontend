import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomNavbar } from '../components/CustomNavbar';
import { CustomButton } from '../components/CustomButton';
import { Footer } from '../components/Footer';
import { useAuth } from '../hooks/AuthContext';

import '../styles/fonts.css';
import '../styles/buttons.css';
import '../styles/navbar.css'

export const ResetPassword = () => {

  // Estados del componente
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth()

  // Funcionalidades del componente
  const handlePrevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };
  async function handleResetPassword(e) {
    e.preventDefault();
    try{
      await resetPassword(email);
    } catch{
      console.log('Failed to reset password')
    }
    setStep(step + 1);
  };
  const isEmailValid = () => {
    const tecMxEmailRegex = /^[\w-.]+@tec\.mx$/;
    return tecMxEmailRegex.test(email);
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
    <section id="resetPasswordForm">
      <CustomNavbar tabs={navbar.tabs} links={navbar.links} components={navbar.components}/>
      <div className="startSection container-cc container">
        <div className="img">
            <img className='"img-fluid"' id='astronautImage' src={require('../assets/img/astronaut.png')} alt="astronautImage" />
        </div>

        <form onSubmit={handleResetPassword}>


          {step === 1 && (
            <div>

              <div className="text-center mb-4">
                <h3 className="mb-0">Restablecer contraseña</h3>
                <span>Ingresa tu correo electrónico</span>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email" className="text-center mb-2">Correo electrónico</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="your.email@tec.mx" required />
                {!isEmailValid() && (
                  <div className="text-danger">El correo electrónico es inválido</div>
                )}
              </div>

              <div className="container-cc">
                <CustomButton
                  type={'btn mt-3 btnPrimary'}
                  text={'Restablecer contraseña'}
                  func={handleResetPassword}
                  disabled={!isEmailValid()}/>
              </div>

            </div>
          )}

          {step === 2 && (
            <div>

              <div className="text-center mb-2">
                <span>Se te ha enviado un correo para restablecer tu contraseña</span>
              </div>

              <div className="container-cc mt-3">
                <CustomButton
                  type={'btn mt-3 btnPrimary'}
                  text={'Enviar otra vez'}
                  func={handlePrevStep}/>
              </div>

            </div>
          )}

        </form>
      </div>
      <Footer/>


    </section>
  );
};