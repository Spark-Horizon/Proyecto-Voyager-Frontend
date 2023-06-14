import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomNavbar } from '../components/CustomNavbar';
import { CustomButton } from '../components/CustomButton';
import { useAuth } from '../hooks/AuthContext';
import { createUser } from '../helpers/indexHelpers'

import '../styles/fonts.css'
import '../styles/buttons.css'

export const SignUp = (props) => {

  // Estados del componente
  const [step, setStep] = useState(1);
  const [Temail, setTEmail] = useState('');
  const [Semail, setSEmail] = useState('');
  const [payroll, setPayroll] = useState('');
  const [name, setName] = useState('');
  const [lastName1, setLastName1] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup, addDataToFirestore } = useAuth()

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
    let newFsUser = {
      id: isTeacher ? payroll.toUpperCase() : Semail.replace(/@tec\.mx$/, "").toUpperCase(),
      name: name,
      lastName1: lastName1,
      lastName2: lastName2,
      email: Temail || Semail,
      timestamp: new Date(),
      role: isTeacher ? 'teacher' : 'student'                  
    }
    let newPsqlUser = {
      id: isTeacher ? payroll.toUpperCase() : Semail.replace(/@tec\.mx$/, "").toUpperCase(),
      name: name,
      lastName1: lastName1,
      lastName2: lastName2,
      role: isTeacher ? 'teacher' : 'student'    
    }
    try {
      const userCredential = await signup(Temail || Semail, password);
      await addDataToFirestore('users', userCredential.user.uid, newFsUser);
      await createUser(newPsqlUser);
    } catch (error) {
      setError('Ese correo ya tiene una cuenta asignada');
    }
  };

  const isTeacherEmailValid = () => {
    const tecTMxEmailRegex = /^(?!A0)(?!a0)[\w-.]+@tec\.mx$/;
    return tecTMxEmailRegex.test(Temail);
  };
  
  const isStudentEmailValid = () => {
    const tecSMxEmailRegex = /^(a0|A0)\w{7,}@tec\.mx$/;
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

  const isNameValid = (_name) => {
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ /']+$/;
    return nameRegex.test(_name);
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
      <section id="signUpForm">
        
        <CustomNavbar tabs={navbar.tabs} links={navbar.links} components={navbar.components}/>

        <div className="container-cc startSection">
          
          <form className='custom-form' onSubmit={handleSignUp}>

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
                  <h2>Ingresa tu correo electrónico institucional</h2>
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
                      {Temail !== '' && !isTeacherEmailValid() && (
                        <div className="text-danger">El correo electrónico es inválido</div>
                      )}
                      <label htmlFor="payroll" className="mt-3 text-center">Nómina</label>
                      <input 
                        type="text" 
                        id="payroll" 
                        value={payroll} 
                        onChange={(e) => setPayroll(e.target.value)} 
                        className="form-control" 
                        placeholder="L01234567" 
                        required 
                      />
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
                      {Semail !== '' && !isStudentEmailValid() && (
                        <div className="text-danger">El correo electrónico es inválido</div>
                      )}
                    </>
                  )}
                </div>

                <div className="select mt-5">
                  <CustomButton
                    type={'btn me-3 btnSecondary'}
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
                  <h2>Completa tu información personal</h2>
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

                <div className="select mt-5">
                  <CustomButton
                    type={'btn me-3 btnSecondary'}
                    text={'Atrás'}
                    func={handlePrevStep}/>
                  <CustomButton
                    type={'btn  btnPrimary btn-primary'}
                    text={'Siguiente'}
                    func={handleNextStep}
                    disabled={!isNameValid(name) || !isNameValid(lastName1) || !isNameValid(lastName2)}/>
                </div>

              </div>
            )}

            {step === 4 && (
              <div>

                <div className="text-center mb-6">
                  <h2>Crea una contraseña</h2>
                </div>

                <div className="text-center mb-4">
                  <span>usando mayúsculas, minúsculas, números y/o símbolos</span>
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="password" className="text-center">Contraseña</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="**********" required />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="confirmPassword" className="text-center">Confirma tu contraseña</label>
                  <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" placeholder="**********" required />
                  {password !== '' && !isPasswordValid() && (
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

                <div className="select mt-5">
                  <CustomButton
                    type={'btn me-3 btnSecondary'}
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
                  <h2>Confirma tus datos</h2>
                  {error && <div className="text-danger">{error}</div>}
                </div>
                
                <div className="text-left mb-4">
                    <p className="fs-5">Nombre completo: {name} {lastName1} {lastName2}</p>
                    <p className="fs-5">Correo electrónico: {Temail || Semail}</p>
                    <p className="fs-5">Tipo de usuario: {isTeacher ? 'Profesor' : 'Estudiante'}</p>
                </div>

                <div className="select mt-5">
                  <button type="button" className="btn btn-secondary me-3" onClick={handlePrevStep}>Atrás</button>
                  <button type="submit" disabled={loading} className="btn btn-primary">Registrarse</button>
                </div>


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