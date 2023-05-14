import React, { useEffect, useRef } from 'react';
import MonacoEditor from '@uiw/react-monacoeditor';
import '../../styles/Compiler.css';
import { CustomButton } from '../CustomButton';

export const Compiler = ({ setCode }) => {
  return (
    <div className='compiler-main-container'>
      <MonacoEditor
        language="python"
        onChange={(newValue, e) => {
          try {
            setCode(newValue);
          } catch (error) {
            console.error(error);
          }
        }}
        options={{
          theme: 'vs-dark',
        }}
      />
    </div>
  );
};
