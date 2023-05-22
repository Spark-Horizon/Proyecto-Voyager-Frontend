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
        "input": "3,3",
        "output": "6"
      },
      {
        "input": "3,3",
        "output": "7"
      },
      {
        "input": "3,3",
        "output": "6"
      }
    ]
  ); 

  const [code, setCode] = useState('');
  const [id, setId] = useState(0);

  // Links y componentes de Navbar
  const links = [];

  const components = [];

  const codeId = "TC1028_21_C_10";
  
  return (
    <div className='ide-route-container'>
      <CustomNavbar links={links} components={components}/>
      <div className="idepage-main-container">
        <CodeInstructions problem_id={codeId}/>
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
