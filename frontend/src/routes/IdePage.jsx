import { useRef, useState } from 'react';

import { CodeInstructions } from "../components/IDE/CodeInstructions"
import { CustomNavbar } from "../components/CustomNavbar"
import { Compiler } from "../components/IDE/Compiler"
import { OutputPanel } from "../components/IDE/OutputPanel";

import '../styles/ide/idePage.css';
import '../styles/ide/compiler.css';

export const IdePage = () => {
  const [driver, setDriver] = useState('main_test'); 
  const [tests, setTests] = useState(
    [
      {
        "input": "hola",
        "output": "hola"
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
