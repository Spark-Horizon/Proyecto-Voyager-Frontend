import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomNavbar } from '../components/CustomNavbar';
import { CustomButton } from '../components/CustomButton';
import { useAuth } from '../hooks/AuthContext';
import { CodeExercise } from "../components/CRUD/CodeExercise"
import { OMExercise } from "../components/CRUD/OMExercise"


import '../styles/fonts.css';
import '../styles/buttons.css';

export const CreateExercise = () => {

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

  const handleExerciseCreation = (e) => {
  }

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleNextStep = () => {
    setStep(step + 1);
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
                  text={'Código'}
                  func={() => handleExerciseTypeClick('Código')}/>
                <CustomButton
                  type={'btn btnPrimary btnResize'}
                  text={'Opción múltiple'}
                  func={() => handleExerciseTypeClick('Opción múltiple')}/>
              </div>

              <div className="select next-back mt-5">
                <Link to='/CRUD'>
                  <CustomButton
                    type={'btn mt-3 btnPrimary'}
                    text={'Regresar a inicio'}/>
                </Link>
              </div>

            </div>
          )}

            {step === 2 && exerciseType === 'Código' && (
                <CodeExercise 
                autor={''}
                titulo={''}
                descripcion={''}
                tema={''}
                dificultad={''}
                driver={''}
                />
            )}

            {step === 2 && exerciseType === 'Opción múltiple' && (
              <OMExercise 
              autor={''}
              titulo={''}
              descripcion={''}
              tema={''}
              dificultad={''}
              respuesta={'0'}
              pista={''}
              />
          )}
        </form>
      </section> 
    </div>
  )
}