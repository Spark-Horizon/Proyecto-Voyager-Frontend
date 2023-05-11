import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomNavbar } from "../components/CustomNavbar"
import { Compiler } from "../components/IDE/Compiler"
import { OutputPanel } from "../components/IDE/OutputPanel";
import { useRunSubmit } from "../hooks/useRunSubmit";
import { TestCases } from '../components/IDE/TestCases';

import '../styles/idePage.css';


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
      }
    ]
  ); 
  const [code, setCode] = useState('');
  const [id, setId] = useState(0);

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

  return (
    <div>
      <CustomNavbar links={links} components={components}/>
      <div className="ide-main-container">
        <Compiler 
          tests={tests} 
          driver={driver}
          setCode={setCode} 
          code={code} 
          submitData={submitData}
          setSubmitData={setSubmitData}
          fetchSubmissionData={fetchSubmissionData}
        />
        <OutputPanel 
          code={code} 
          tests={tests} 
          driver={driver} 
          id={id} 
          compInfo={compInfo} 
          stdOut={stdOut}
          stdErr={stdErr}
          setSubmitData={setSubmitData}
          fetchSubmissionData={fetchSubmissionData}
        />
        <TestCases
          tests={testsData}
        />
      </div>
    </div>
  )
}
