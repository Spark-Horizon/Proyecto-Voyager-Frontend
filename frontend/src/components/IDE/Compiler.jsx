import React, { useEffect, useRef } from 'react';
import MonacoEditor from '@uiw/react-monacoeditor';
import '../../styles/Compiler.css';
import { CustomButton } from '../CustomButton';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const Compiler = ({ tests, driver, setCode, code, submitData, setSubmitData, fetchSubmissionData }) => {
  const isFirstRender = useRef(true);

  const runCode = () => {
    const runData = {
      code: code,
      tests: tests,
      driver: driver
    };

    setSubmitData(runData);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      const fetchData = async () => {
        try {
          await fetchSubmissionData(`http://${backendUrl}:3000/compiler/problem/run`, 'post');
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [submitData]);

  return (
    <div className='compiler-main-container'>
      <div className="compiler-buttons-container">
        <CustomButton
          text={"Run"}
          func={runCode}
          type={"run"}
        />
      </div>
      <MonacoEditor
        language="python"
        className='test'
        onChange={(newValue, e) => {
          setCode(newValue);
        }}
        options={{
          theme: 'vs-dark',
        }}
      />
    </div>
  );
};
