import { useState } from 'react';
import { NavbarBasic } from '../components/navbars/NavbarBasic';
import { CustomButton } from '../components/buttons/indexButtons';
import '../styles/fonts.css';
import '../styles/buttons.css';

export const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
  };

  const isEmailValid = () => {
    return email.indexOf('@') !== -1;
  };

  return (
    <div>
      <NavbarBasic />
      <section id="resetPasswordForm" className='container-cc'>

        <form onSubmit={handleResetPassword}>

          {step === 1 && (
            <div>

              <div className="text-center mb-4">
                <h3 className="mb-0">Restablecer contraseña</h3>
                <span>Ingresa tu correo electrónico</span>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email" className="text-center">Correo electrónico</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="your.email@tec.mx" required />
                {!isEmailValid() && (
                  <div className="text-danger">El correo electrónico es inválido</div>
                )}
              </div>

              <div className="container-cc">
                <CustomButton
                  type={'btn mt-3 btnPrimary'}
                  text={'Restablecer contraseña'}
                  func={handleNextStep}
                  disabled={!isEmailValid()}/>
              </div>

              <div className="select next-back mt-3">
                <CustomButton
                  type={'btn mt-3 btnPrimary'}
                  text={'Regresar a inicio'}
                  func={() => window.location.replace('/landing')}/>
              </div>

            </div>
          )}

          {step === 2 && (
            <div>

              <div className="text-center mb-2">
                <h3 className="mb-0">Restablecer contraseña</h3>
                <span>Se te ha enviado un correo para restablecer tu contraseña</span>
              </div>

              <div className="container-cc mt-3">
                <CustomButton
                  type={'btn mt-3 btnPrimary'}
                  text={'Enviar otra vez'}
                  func={handlePrevStep}/>
              </div>

              <div className="select next-back mt-3">
                <CustomButton
                  type={'btn mt-3 btnPrimary'}
                  text={'Regresar a inicio'}
                  func={() => window.location.replace('/landing')}/>
              </div>

            </div>
          )}

        </form>

      </section>
    </div>
  );
};