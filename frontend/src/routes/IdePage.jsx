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
  const [driver, setDriver] = useState('main_test');
  const [tests, setTests] = useState(
    [
      {
        "input": "5,4",
        "output": "9"
      },
      {
        "input": "3,4",
        "output": "7"
      },
      {
        "input": "4,3",
        "output": "7"
      },
      {
        "input": "10,3",
        "output": "13"
      },
      {
        "input": "3,3",
        "output": "6"
      }
    ]
  );

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
  
  console.log(practica, typeInfo, unlockedPath, data);

  // Funcion para el boton de submit
  const submitFunc = (respuesta, correcto) => {
    submitPractica(practica.id, respuesta, correcto)
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

              />
              <OutputPanel
                code={code}
                tests={tests}
                driver={driver}
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
