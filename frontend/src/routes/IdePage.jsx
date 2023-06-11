import { useRef, useState } from 'react';

import { CodeInstructions } from "../components/IDE/CodeInstructions"
import { CustomNavbar } from "../components/CustomNavbar"
import { Compiler } from "../components/IDE/Compiler"
import { OutputPanel } from "../components/IDE/OutputPanel";

import '../styles/idePage.css';
import '../styles/Compiler.css';

export const IdePage = () => {
  const [driver, setDriver] = useState(''); 
  const [tests, setTests] = useState(
    [
      {
        "input": 9,
        "output": "9"
      },
      {
        "input": 4,
        "output": "4"
      },
      {
        "input": 3,
        "output": "3"
      },
      {
        "input": 10,
        "output": "10"
      },
      {
        "input": 8,
        "output": "8"
      }
    ]
  ); 

  const [code, setCode] = useState('');
  const [id, setId] = useState(0);
  
  return (

    <div className='ide-route-container'>
      <CustomNavbar/>
      <div className="idepage-main-container">
        <CodeInstructions />
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
