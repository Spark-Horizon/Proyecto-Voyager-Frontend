import { useRef } from 'react';
import { CustomButton } from '../CustomButton';
import { Console } from './Console';
import { TestCases } from './TestCases';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const OutputPanel = (
  {
    code,
    tests,
    testsData,
    driver,
    compInfo,
    stdOut,
    stdErr,
    setSubmitData,
    fetchSubmissionData
  }
) => {
  const runCode = async () => {
    const runData = {
      code: code,
      tests: tests,
      driver: driver
    };

    setSubmitData(runData);
    try {
      await fetchSubmissionData(`http://${backendUrl}:3000/compiler/problem/run`, 'post');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="output-panel-main-container">
      <div className="compiler-buttons-container">
        <CustomButton
          text={"Run"}
          func={runCode}
          type={"run"}
        />
        <CustomButton
          text={"Submit"}
          type={"submit"}
        />
      </div>
      <TestCases
        tests={testsData}
      />
      <Console stdOut={stdOut || stdErr || compInfo}/>
    </div>
  )
}
