import { useRef, useState } from 'react';

import { CodeInstructions } from "../components/IDE/CodeInstructions"
import { CustomNavbar } from "../components/CustomNavbar"
import { Compiler } from "../components/IDE/Compiler"
import { OutputPanel } from "../components/IDE/OutputPanel";

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
