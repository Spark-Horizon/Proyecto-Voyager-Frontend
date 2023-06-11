import { useRef, useState } from 'react';

import { CodeInstructions } from "../components/IDE/CodeInstructions"
import { CustomNavbar } from "../components/CustomNavbar"
import { Compiler } from "../components/IDE/Compiler"
import { OutputPanel } from "../components/IDE/OutputPanel";

import '../styles/idePage.css';
import '../styles/Compiler.css';

export const IdePage = () => {
  const [driver, setDriver] = useState('sum'); 
  const [tests, setTests] = useState(
    [
      {
        "input": [9,10],
        "output": 19
      },
      {
        "input": [10,1],
        "output": 11
      },
      {
        "input": [7,6],
        "output": 13
      },
      {
        "input": [7,7],
        "output": 14
      },
      {
        "input": [4,6],
        "output": 10
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
