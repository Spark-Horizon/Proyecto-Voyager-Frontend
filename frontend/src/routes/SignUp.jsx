import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomNavbar } from '../components/CustomNavbar';
import { CustomButton } from '../components/CustomButton';
import { useAuth } from '../hooks/AuthContext';

import '../styles/fonts.css'
import '../styles/buttons.css'

export const SignUp = (props) => {

  // Estados del componente
  const [step, setStep] = useState(1);
  const [Temail, setTEmail] = useState('');
  const [Semail, setSEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName1, setLastName1] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth()

  // Funcionalidades del componente
  const resetFields = () => {
    setTEmail('');
    setSEmail('');
    setName('');
    setLastName1('');
    setLastName2('');
    setPassword('');
    setConfirmPassword('');
    setTerms(false);
    setIsTeacher(false);
    setLoading(false);
  };
  
  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrevStep = (e) => {
    e.preventDefault();
    if (step === 2) {
      resetFields();
    }
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

  async function handleSignUp(e) {
    e.preventDefault();
    try{
      setLoading(true);
      await signup(Temail || Semail, password);
    } catch {
      setError('Ese correo ya tiene una cuenta asignada');
      console.log("Fallo al registrar la cuenta");
    }
    setLoading(false);
  };

  const isTeacherEmailValid = () => {
    const tecTMxEmailRegex = /^(?!A0)(?!a0)[\w-.]+@tec\.mx$/;
    return tecTMxEmailRegex.test(Temail);
  };
  
  const isStudentEmailValid = () => {
    const tecSMxEmailRegex = /^(a0)|(A0)\w{7,}@tec\.mx$/;
    return tecSMxEmailRegex.test(Semail);
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*([\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])).*[\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,18}$/;
  
  const isPasswordValid = () => {
    if (password === '' || confirmPassword === '') {
      return false;
    }
    if (!passwordRegex.test(password)) {
      return false;
    } 
    return password === confirmPassword;
  };

  const isNameValid = () => {
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ /']+$/;
    return nameRegex.test(name);
  };

  const isLastName1Valid = () => {
    const lastName1Regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ /']+$/;
    return lastName1Regex.test(lastName1);
  };

  const isLastName2Valid = () => {
    const lastName2Regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ /']+$/;
    return lastName2Regex.test(lastName2);
  };

  // Links y componentes de Navbar
  const links = [];
  const components = [
    {component: <Link to='/'><CustomButton type={'btn btn-sm btnPrimary'} text={'Regresar a inicio'}/></Link>}
  ];

  return (
    <div>
      <section id="signUpForm">
        
        <CustomNavbar links={links} components={components}/>

        <div className="container-cc startSection">
          
          <form onSubmit={handleSignUp}>

            {step === 1 && (
              <div>

                <div className="text-center mb-4">
                  <h2>Selecciona si eres profesor o estudiante</h2>
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

              </div>
            )}

            {step === 2 && (
              <div>

                <div className="text-center mb-5">
                  <span>Ingresa tu correo electrónico institucional</span>
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="email" className="text-center">Correo electrónico</label>
                  {isTeacher ? (
                    <>
                      <input 
                        type="email" 
                        id="email" 
                        value={Temail} 
                        onChange={(e) => setTEmail(e.target.value)} 
                        className="form-control" 
                        placeholder="your.email@tec.mx" 
                        required 
                      />
                      {!isTeacherEmailValid() && (
                        <div className="text-danger">El correo electrónico es inválido</div>
                      )}
                    </>
                  ) : (
                    <>
                      <input 
                        type="email" 
                        id="email" 
                        value={Semail} 
                        onChange={(e) => setSEmail(e.target.value)} 
                        className="form-control" 
                        placeholder="your.email@tec.mx" 
                        required 
                      />
                      {!isStudentEmailValid() && (
                        <div className="text-danger">El correo electrónico es inválido</div>
                      )}
                    </>
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
                    disabled={!isTeacherEmailValid() && !isStudentEmailValid()}/>
                </div>

              </div>
            )}

            {step === 3 && (
              <div>

                <div className="text-center mb-4">
                  <span>Completa tu información personal</span>
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="name" className="text-center">Nombre(s)</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="lastName1" className="text-center">Apellido paterno</label>
                  <input
                    type="text"
                    id="lastName1"
                    value={lastName1}
                    onChange={(e) => setLastName1(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="lastName2" className="text-center">Apellido materno</label>
                  <input
                    type="text"
                    id="lastName2"
                    value={lastName2}
                    onChange={(e) => setLastName2(e.target.value)}
                    className="form-control"
                    required
                  />
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
                    disabled={!isNameValid() || !isLastName1Valid() || !isLastName2Valid()}/>
                </div>

              </div>
            )}

            {step === 4 && (
              <div>

                <div className="text-center mb-6">
                  <span>Crea una contraseña de entre 6 y 18 caracteres usando</span>
                </div>

                <div className="text-center mb-4">
                  <span> mayúsculas, minúsculas, números y/o símbolos</span>
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="password" className="text-center">Contraseña</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="**********" required />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="confirmPassword" className="text-center">Confirma tu contraseña</label>
                  <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" placeholder="**********" required />
                  {!isPasswordValid() && (
                    <>
                      {(password.length < 6 || password.length > 18) && <div className="text-danger">La contraseña debe tener mínimo 6 y máximo 18 caracteres</div>}
                      {!passwordRegex.test(password) && <div className="text-danger">La contraseña debe tener al menos una minúscula una mayúscula y un símbolo o número</div>}
                      {password !== confirmPassword && <div className="text-danger">Las contraseñas no coinciden</div>}
                    </>
                  )}
                </div>



                <div className="form-check mb-4">
                    <input type="checkbox" id="terms" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="form-check-input" />
                    <label htmlFor="terms" className="form-check-label">
                    Acepto los términos y condiciones
                    </label>
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
                    disabled={!isPasswordValid() || !terms}/>
                </div>

              </div>
            )}

            {step === 5 && (
              <div>

                <div className="text-center mb-4">
                  <span>Confirma tus datos</span>
                  {error && <div className="text-danger">{error}</div>}
                </div>
                
                <div className="text-left mb-4">
                    <p className="fs-5">Nombre completo:</p>
                    <p className="fs-6">{name} {lastName1} {lastName2}</p>
                    <p className="fs-5">Correo electrónico:</p>
                    <p className="fs-6">{Temail || Semail}</p>
                    <p className="fs-5">Tipo de usuario:</p>
                    <p className="fs-6">{isTeacher ? 'Profesor' : 'Estudiante'}</p>
                </div>

                  <button type="submit" disabled={loading} className="btn btn-primary mt-2">Registrarse</button>
                  <button type="button" className="btn btn-secondary mt-3" onClick={handlePrevStep}>Atrás</button>

              </div>
            )}

            <div className="text-center mt-4">
              <span>¿Ya tienes una cuenta? </span>
              <Link className='text-primary text-decoration-none' to='/signin'>Inicia sesión</Link>
            </div>

          </form>

        </div>

      </section>
    </div>
  );
};