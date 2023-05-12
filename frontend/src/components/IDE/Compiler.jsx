import React, { useEffect, useRef } from 'react';
import MonacoEditor from '@uiw/react-monacoeditor';
import '../../styles/Compiler.css';
import { CustomButton } from '../CustomButton';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const Compiler = ({ tests, driver, setCode, code, submitData, setSubmitData, fetchSubmissionData }) => {
  return (
    <div className='compiler-main-container'>
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
