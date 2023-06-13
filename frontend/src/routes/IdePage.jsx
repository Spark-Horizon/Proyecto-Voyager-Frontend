import { useEffect, useRef, useState } from 'react';

import { CodeInstructions } from "../components/IDE/CodeInstructions"
import { CustomNavbar } from "../components/CustomNavbar"
import { CustomButton } from '../components/CustomButton'
import { Compiler } from "../components/IDE/Compiler"
import { OutputPanel } from "../components/IDE/OutputPanel";

import { useGetPractica } from '../hooks/useGetPractica';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAvailableType } from '../hooks/useAvailableType';
import { useGetUnlocked } from '../hooks/useGetUnlocked';
import { useGetTask } from '../hooks/useGetTask';
import { submitPractica } from '../helpers/indexHelpers';

import '../styles/idePage.css';
import '../styles/Compiler.css';

export const IdePage = () => {
  const [driver, setDriver] = useState('');
  const [tests, setTests] = useState([]);
  const [driverFunc, setDriverFunc] = useState('')

  const [code, setCode] = useState('');
  const [id, setId] = useState(0);

  // Variable de informacion almancenada para la ruta
  const location = useLocation().state
  const navigate = useNavigate()
  //settear problem id y buscar su practica
  const [problem_id, setProblemID] = useState("")
  const { practica } = useGetPractica(location.subtem, "C")
  // Hook de bloqueo de nivel
  const { unlockedPath } = useGetUnlocked(location.materia)
  const { typeInfo } = useAvailableType(location.path, unlockedPath)
  // Hook de modo practica
  const [practiceMode, setPracticeMode] = useState(location.practiceMode)
  // Hook de ejercicio
  const { data } = useGetTask(problem_id)

  // Cambiar el ejercicio
  useEffect(() => {
    if (practica != null) {
      const problemID = practica.id_ejercicio
      setProblemID(problemID)
    }
  }, [practica])
  
  useEffect(() => {
    if(data != null){
      console.table('DATA XD', data);
      const newTests = data.tests
      const newDriver = data.driver
      console.log('NEWDRIVER', newDriver)
      setTests(newTests)
      setDriver(newDriver)
      setDriverFunc(`# Escribe tu código en la siguiente función\ndef ${newDriver}():\n\tpass`)
    }
  }, [data])

  // Cambiar el modo practica
  useEffect(() => {
    if (unlockedPath != null) {
      const actualMode = unlockedPath.find(item => item.id_subtema === location.subtem && item.superado)
      setPracticeMode(actualMode)
    }
  }, [unlockedPath])
  
  // Esperar a cargar la informacion de los hooks
  if (!practica || !typeInfo || !unlockedPath || !data) {
    return <div>Cargando...</div>
  }

  // Funcion para el boton de submit
  const submitFunc = (respuesta) => {
    submitPractica(practica.id, respuesta)
  }

  // Funcion para el boton de siguiente... probablemente cambie
  const handleNext = () => {
    if (typeInfo[location.subtem]["c"].available === false) {
      navigate(-1)
    } else {
      window.location.reload()
    }
  }

  const handleRender = () => {
    if (!typeInfo[location.subtem]["c"].available && !practiceMode) {
      return (
        <div className="mo-route-container">
          <div className="mopage-main-container container-cc">
            <div className="mo-instructions">
              <div className="mo-instructions-content">
                <div className="mo-instructions-info">
                  <div className="code-instructions-title">
                    <h3>Resuelve la parte de Opción Múltiple antes de avanzar.</h3>
                  </div>
                </div>
                <div className="mo-instructions-submit container-cc">
                  <CustomButton type='btn' text={'Regresar al Path'} func={handleNext} />
                </div>
              </div>
            </div>
          </div>
        </div >
      )
    } else {
      return (
        <div className='ide-route-container'>
          <CustomNavbar />
          <div className="idepage-main-container">
            {practiceMode ? (
              <span>
                MODO PRACTICA:
                <br />
              </span>
            ) : null}
            <CodeInstructions data={data} handleNext={handleNext} submitFunc={submitFunc} />
            <div className="ide-outputpanel-main-container">
              <Compiler
                setCode={setCode}
                initialCode={driver ? driverFunc : ''}
              />
              <OutputPanel
                code={code}
                tests={tests}
                driver={driver}
                submitFunc={submitFunc}
                handleNext={handleNext}
              />
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    handleRender()
  )
}
