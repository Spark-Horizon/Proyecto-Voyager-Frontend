import { CodeInstructions } from "../components/IDE/CodeInstructions"
import { Link } from 'react-router-dom';

import { CustomNavbar } from "../components/CustomNavbar"
import { Compiler } from "../components/IDE/Compiler"
import { OutputPanel } from "../components/IDE/OutputPanel";
import { useRunSubmit } from "../hooks/useRunSubmit";
import { Adjuster } from '../components/IDE/Adjuster';

import '../styles/idePage.css';
import '../styles/Compiler.css';
import { useRef, useState } from 'react';

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
  const [ideHeight, setIdeHeight] = useState('60%');
  const [outputPanelHeight, setOutputPanelHeight] = useState('calc(40% - 10px');

  const outputPanelContainer = useRef(null)

  const { compInfo, stdOut, stdErr, testsData, axiosError, submitData, setSubmitData, fetchSubmissionData } = useRunSubmit();

  // Links y componentes de Navbar
  const links = [
    { text: 'Link1', url: '/' },
    { text: 'Link2', url: '/' },
    { text: 'Link3', url: '/' },
  ];

  const components = [
      {component: <Link></Link>},
  ];

  const codeId = "TC1028_21_C_10";
  
  return (
    <div>
      <CustomNavbar links={links} components={components}/>
      <div className="idepage-main-container">
        <CodeInstructions problem_id={codeId}/>
        <div className="ide-outputpanel-main-container" ref={outputPanelContainer}>
          <Compiler 
            setCode={setCode} 
            ideHeight={ideHeight}
          />
          <Adjuster 
            setIdeHeight={setIdeHeight}
            setOutputPanelHeight={setOutputPanelHeight}
            fatherContainer={outputPanelContainer}
          />
          <OutputPanel 
            code={code} 
            tests={tests} 
            testsData={testsData}
            driver={driver} 
            id={id} 
            compInfo={compInfo} 
            stdOut={stdOut}
            stdErr={stdErr}
            setSubmitData={setSubmitData}
            fetchSubmissionData={fetchSubmissionData}
            outputPanelHeight={outputPanelHeight}
          />
        </div>
      </div>
    </div>
  )
}
