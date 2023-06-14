import { useRef, useState, useEffect } from 'react';

import { CodeInstructions } from "../IDE/CodeInstructions"
import { CustomNavbar } from "../CustomNavbar"
import { Compiler } from "../IDE/Compiler"
import { OutputPanel } from "../IDE/OutputPanel";

import '../../styles/ide/idePage.css';
import '../../styles/ide/compiler.css';

export const CompilerPage = ({ id, data, submitFunc, handleNextQuestion }) => {
  const [driver, setDriver] = useState(null); 
  const [tests, setTests] = useState([]);
  const [driverFunc, setDriverFunc] = useState('')

  const [code, setCode] = useState('');

  useEffect(() => {
    if(data != null){
      const newTests = data.tests
      const newDriver = data.driver
      setTests(newTests)
      setDriver(newDriver)
      setDriverFunc(`# Escribe tu código en la siguiente función\ndef ${newDriver}():\n\tpass`)
    }
  }, [data])

  if(!data){
    return <div>Cargando...</div>
  }
  
  return (
    <div className='ide-route-container vh-100'>
      <CustomNavbar />
      <div className="idepage-main-container">
        <CodeInstructions data={data} />
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
            handleNext={handleNextQuestion}
          />
        </div>
      </div>
    </div>
  )
}
