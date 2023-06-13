import { useEffect } from 'react';
import { useState, useRef } from 'react';

import { buttonLoadingAnimation, removeLoadingAnimation } from '../../helpers/button_animations/submitAnimation';
import { useRunSubmit } from "../../hooks/useRunSubmit";
import { TestCases } from './TestCases';
import { Console } from './Console';


const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT

export const OutputPanel = ({
  code,
  tests,
  driver,
  submitFunc,
  handleNext
}) => {
  const { data, isLoading, setSubmitData, fetchSubmissionData } = useRunSubmit();
  const [submitPressed, seTsubmitPressed] = useState(false)
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [runIsLoading, setRunIsLoading] = useState(false);
  const [canChange, setCanChange] = useState(false);
  const isInitialRender = useRef(true);
  const submitRef = useRef(null);
  const runRef = useRef(null);

  const { compInfo, stdOut, stdErr, testsData, axiosError, submitData } = data;

  const runCode = async () => {
    const runData = {
      code: code,
      tests: tests,
      driver: driver,
    };    

    console.log('RUN DATA', runData)
    if (!submitIsLoading && !runIsLoading) {
      try {
        setRunIsLoading(true);
        // Pasamos los datos directamente a fetchSubmissionData
        await fetchSubmissionData(`http://${backendUrl}:${port}/compiler/problem/run`, 'post', runData);
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const submitCode = async () => {
    const runData = {
      code: code,
      tests: tests,
      driver: driver,
    }
    if (!runIsLoading && !submitIsLoading) {
      try {
        setSubmitIsLoading(true);
        seTsubmitPressed(true)
        await fetchSubmissionData(`http://${backendUrl}:${port}/compiler/problem/run`, 'post', runData);
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    console.log('useEffect isLoading', isLoading)
    if (runIsLoading) {
      console.log('pressed Run')
      if (isLoading) {
        buttonLoadingAnimation(runRef);
      } else {
        removeLoadingAnimation(runRef);
        setRunIsLoading(false);
      }
    }
    if (submitIsLoading) {
      console.log('pressed submit')
      if (isLoading) {
        buttonLoadingAnimation(submitRef);
      } else {
        removeLoadingAnimation(submitRef);
        setSubmitIsLoading(false);
      }
    }

  }, [isLoading])

  useEffect(() => {
    if (submitPressed) {
      const correct = testsData.some(el => el.passed === false)
      console.log('TESTDATAXD', testsData)
      submitFunc({respuesta: code, correcto: !correct})
      setCanChange(true)
      seTsubmitPressed(false);
    }
  }, [testsData])
  
  return (
    <div className="output-panel-main-container">
      <div className="compiler-buttons-main-container">
        <p className="gradient test-cases-header">Testcases</p>
        <div className="compiler-buttons-container">
          <button className="run" onClick={runCode} ref={runRef}></button>
          <button className="submit" onClick={submitCode} ref={submitRef}></button>
          <button className="next" onClick={handleNext} style={{display: canChange ? 'inline-block' : 'none'}}></button>
        </div>
      </div>
      <TestCases tests={testsData} />
    </div>
  );
};
