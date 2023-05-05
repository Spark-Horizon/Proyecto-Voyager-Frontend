import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomNavbar } from '../components/CustomNavbar';
import { CustomButton } from '../components/CustomButton';
import { useAuth } from '../hooks/AuthContext';

import '../styles/fonts.css';
import '../styles/buttons.css';

export const CreateExercise = (props) => {

  // Estados del componente
  const [step, setStep] = useState(1);
  const [exerciseType, setExerciseType] = useState(null);

  // Links y componentes de Navbar
  const links = [];
  const components = [];

  const handleExerciseTypeClick = (type) => {
    setExerciseType(type);
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleExerciseCreation= (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <CustomNavbar links={links} components={components}/>
      <section id="exerciseCreationForm" className='container-cc'>

        <form onSubmit={handleExerciseCreation}>

          {step === 1 && (
            <div>

              <div className="text-center mb-4">
                <h3 className="mb-0">Creación de ejercicios</h3>
                <span>Selecciona el tipo de ejercicio que quieres crear</span>
              </div>

              <div className="select">
                <CustomButton
                  type={'btn btnPrimary btnResize'}
                  text={'Ejercicio de código'}
                  func={() => handleExerciseTypeClick('Código')}/>
                <CustomButton
                  type={'btn btnPrimary btnResize'}
                  text={'Ejercicio de opción múltiple'}
                  func={() => handleExerciseTypeClick('Opción múltiple')}/>
              </div>

              <div className="select next-back mt-5">
                <Link to='/'>
                  <CustomButton
                    type={'btn mt-3 btnPrimary'}
                    text={'Regresar a inicio'}/>
                </Link>
              </div>

            </div>
          )}

            {step === 2 && exerciseType === 'Código' && (
            <div>
                <div className="text-center mb-5">
                <h3 className="mb-0">Ejercicio de código</h3>
                <span>Ingresa los detalles del ejercicio</span>
                </div>

                <div className="form-group mb-4">
                <label htmlFor="autor" className="text-center">Autor</label>
                <input 
                    type="text" 
                    id="autor" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-control" 
                    placeholder="Autor del ejercicio" 
                    required 
                />
                </div>

                <div className="form-group mb-4">
                <label htmlFor="titulo" className="text-center">Título</label>
                <input 
                    type="text" 
                    id="titulo" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-control" 
                    placeholder="Título del ejercicio" 
                    required 
                />
                </div>

                <div className="form-group mb-4">
                <label htmlFor="descripcion" className="text-center">Descripción</label>
                <textarea 
                    id="descripcion" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-control" 
                    placeholder="Descripción del ejercicio" 
                    rows={5} 
                    required 
                />
                </div>

                <div className="form-group mb-4">
                <label htmlFor="tema" className="text-center">Tema</label>
                <select 
                    id="tema" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-select form-select-sm"
                    aria-label="Filtro" 
                    required 
                >
                    <option value=""></option>
                </select>
                </div>

                <div className="form-group mb-4">
                <label htmlFor="dificultad" className="text-center">Dificultad</label>
                <select 
                    id="dificultad" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-select form-select-sm"
                    aria-label="Filtro" 
                    required 
                >
                    <option value=""></option>
                </select>
                </div>

                <div className="form-group mb-4">
                <label htmlFor="driver" className="text-center">Driver</label>
                <input 
                    type="text" 
                    id="driver" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-control" 
                    placeholder="" 
                    required 
                />
                </div>

                <h5 className="mb-2">Casos de prueba</h5>

                <div className="form-group mb-4">
                <label htmlFor="input" className="text-center">Input</label>
                <textarea 
                    id="input" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-control" 
                    placeholder="Input del ejercicio" 
                    rows={5} 
                    required 
                />
                <label htmlFor="output" className="text-center">Output</label>
                <textarea 
                    id="output" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-control" 
                    placeholder="Output del ejercicio" 
                    rows={5} 
                    required 
                />
                </div>

                <div className="select next-back mt-5">
                <CustomButton
                    type={'btn btnSecondary'}
                    text={'Atrás'}
                    func={handlePrevStep}
                />
                <CustomButton
                    type={'btn btn-success'}
                    text={'Crear ejercicio'}
                    func={handleNextStep}
                />
                </div>
            </div>
            )}

            {step === 2 && exerciseType === 'Opción múltiple' && (
            <div>
                <div className="text-center mb-5">
                <h3 className="mb-0">Ejercicio de código</h3>
                <span>Ingresa los detalles del ejercicio</span>
                </div>
        
                <div className="form-group mb-4">
                <label htmlFor="autor" className="text-center">Autor</label>
                <input 
                    type="text" 
                    id="autor" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-control" 
                    placeholder="Autor del ejercicio" 
                    required 
                />
                </div>
            
                <div className="form-group mb-4">
                <label htmlFor="titulo" className="text-center">Título</label>
                <input 
                    type="text" 
                    id="titulo" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-control" 
                    placeholder="Título del ejercicio" 
                    required 
                />
                </div>
            
                <div className="form-group mb-4">
                <label htmlFor="descripcion" className="text-center">Descripción</label>
                <textarea 
                    id="descripcion" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-control" 
                    placeholder="Descripción del ejercicio" 
                    rows={5} 
                    required 
                />
                </div>
            
                <div className="form-group mb-4">
                <label htmlFor="tema" className="text-center">Tema</label>
                <select 
                    id="tema" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-select form-select-sm"
                    aria-label="Filtro" 
                    required 
                >
                    <option value=""></option>
                </select>
                </div>
            
                <div className="form-group mb-4">
                <label htmlFor="dificultad" className="text-center">Dificultad</label>
                <select 
                    id="dificultad" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-select form-select-sm"
                    aria-label="Filtro" 
                    required 
                >
                    <option value=""></option>
                </select>
                </div>
            
                <div className="form-group mb-4">
                <label htmlFor="respuesta" className="text-center">Respuesta</label>
                <input 
                    type="text" 
                    id="respuesta" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-control" 
                    placeholder="" 
                    required 
                />
                </div>

                <div className="form-group mb-4">
                <label htmlFor="pistas" className="text-center">Pistas</label>
                <select 
                    id="pistas" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-select form-select-sm"
                    aria-label="Filtro" 
                    required 
                >
                    <option value=""></option>
                </select>
                </div>
            
                <h5 className="mb-2">Opciones</h5>
        
                <div className="form-group mb-4">
                <label htmlFor="texto" className="text-center">Texto</label>
                <textarea 
                    id="texto" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-control" 
                    placeholder="Texto del ejercicio" 
                    rows={5} 
                    required 
                />
                <label htmlFor="explicacion" className="text-center">Explicación</label>
                <textarea 
                    id="explicacion" 
                    value={''} 
                    onChange={() => {}} 
                    className="form-control" 
                    placeholder="Explicacion del ejercicio" 
                    rows={5} 
                    required 
                />
                </div>
            
                <div className="select next-back mt-5">
                <CustomButton
                    type={'btn btnSecondary'}
                    text={'Atrás'}
                    func={handlePrevStep}
                />
                <CustomButton
                    type={'btn btn-success'}
                    text={'Crear ejercicio'}
                    func={handleNextStep}
                />
                </div>
            </div>
          )}
        </form>
      </section> 
    </div>
  )
}