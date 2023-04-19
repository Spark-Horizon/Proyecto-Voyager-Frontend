import { useState } from 'react';
import { NavbarBasic } from '../components/navbars/NavbarBasic';
import { CustomButton } from '../components/buttons/indexButtons';

export const SignUp = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName1, setLastName1] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleTeacherClick = (e) => {
    e.preventDefault();
    setIsTeacher(true);
    setStep(step + 1);
  };

  const handleStudentClick = (e) => {
    e.preventDefault();
    setIsTeacher(false);
    setStep(step + 1);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    alert('FUNCIONA UnUnt');
  };

  const isEmailValid = () => {
    return email.indexOf('@') !== -1;
  };

  const isPasswordValid = () => {
    return password === confirmPassword;
  };

  return (
    <div>
      <NavbarBasic />
      <section id="signUpForm" className='container-cc'>
        <form onSubmit={handleSignUp}>

          {step === 1 && (
            <div>
              <div className="text-center mb-4">
                <h3 className="mb-0">Registro</h3>
                <span>Selecciona si eres profesor o estudiante</span>
              </div>

              <div className="select">
                <CustomButton
                  type={'btn btnPrimary btnResize'}
                  text={'Profesor'}
                  func={handleTeacherClick}/>
                <CustomButton
                  type={'btn btnPrimary btnResize'}
                  text={'Estudiante'}
                  func={handleStudentClick}/>
              </div>

              <div className="text-center mt-4">
                    <span>¿Ya tienes una cuenta?</span>
                    <CustomButton
                      type={'btn mt-3 btnSecondary'}
                      text={'Inicia sesión'}
                      func={() => window.location.replace('/signin')}/>
                </div>
            </div>
          )}

          {step === 2 && (
            <div>

              <div className="text-center mb-5">
                <h3 className="mb-0">Registro</h3>
                <span>Ingresa tu correo electrónico</span>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="email" className="text-center">Correo electrónico</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="your.email@tec.mx" required />
                {!isEmailValid() && (
                  <div className="text-danger">El correo electrónico es inválido</div>
                )}
              </div>

              <div className="select next-back mt-5">
                <CustomButton
                  type={'btn btnSecondary'}
                  text={'Atrás'}
                  func={handlePrevStep}/>
                <CustomButton
                  type={'btn  btnPrimary btn-primary'}
                  text={'Siguiente'}
                  func={handleNextStep}
                  disabled={!isEmailValid()}/>
              </div>

            </div>
          )}

          {step === 3 && (
            <div>
              <div className="text-center mb-4">
                <h1 className="h3 mb-0">Registro</h1>
                <p className="lead">Completa tu información personal</p>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="name" className="text-center fs-4">Nombre(s)</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="form-control" 
                  placeholder="Nombre(s)" 
                  required 
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="lastName1" className="text-center fs-4">Apellido paterno</label>
                <input 
                  type="text" 
                  id="lastName1" 
                  value={lastName1} 
                  onChange={(e) => setLastName1(e.target.value)} 
                  className="form-control" 
                  placeholder="Apellido paterno" 
                  required 
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="lastName2" className="text-center fs-4">Apellido materno</label>
                <input 
                  type="text" 
                  id="lastName2" 
                  value={lastName2} 
                  onChange={(e) => setLastName2(e.target.value)} 
                  className="form-control" 
                  placeholder="Apellido materno" 
                  required 
                />
              </div>
              <button 
                type="button" 
                className="btn btn-secondary mr-3" 
                onClick={handlePrevStep}
              >
                Atrás
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleNextStep}
              >
                Siguiente
              </button>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="text-center mb-4">
                <h1 className="h3 mb-0">Registro</h1>
                <p className="lead">Crea una contraseña</p>
              </div>
            <div className="form-group mb-4">
                <label htmlFor="password" className="text-center fs-4">Contraseña</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Contraseña" required />
            </div>
            <div className="form-group mb-4">
                <label htmlFor="confirmPassword" className="text-center fs-4">Confirma tu contraseña</label>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" placeholder="Confirmar contraseña" required />
                {!isPasswordValid() && (
                  <div className="text-danger">Las contraseñas no coinciden</div>
                )}
            </div>
            <div className="form-check mb-4">
                <input type="checkbox" id="terms" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="form-check-input" />
                <label htmlFor="terms" className="form-check-label">
                Acepto los términos y condiciones
                </label>
            </div>
                <button type="button" className="btn btn-secondary mr-3" onClick={handlePrevStep}>Atrás</button>
                <button type="button" className="btn btn-primary" onClick={handleNextStep} disabled={!isPasswordValid() || !terms}>Siguiente</button>
            </div>
          )}

          {step === 5 && (
            <div>
              <div className="text-center mb-4">
                <h1 className="h3 mb-0">Registro</h1>
                <p className="lead">Confirma tus datos</p>
              </div>
            <div className="text-left mb-4">
                <p className="fs-5">Nombre completo:</p>
                <p className="fs-6">{name} {lastName1} {lastName2}</p>
                <p className="fs-5">Correo electrónico:</p>
                <p className="fs-6">{email}</p>
                <p className="fs-5">Tipo de usuario:</p>
                <p className="fs-6">{isTeacher ? 'Profesor' : 'Estudiante'}</p>
            </div>
                <button type="button" className="btn btn-secondary mr-3" onClick={handlePrevStep}>Atrás</button>
                <button type="submit" className="btn btn-primary">Registrarse</button>
            </div>
          )}

        </form>
      </section>
    </div>
  );
};