import React, { useEffect, useRef } from 'react';
import MonacoEditor from '@uiw/react-monacoeditor';

export const Compiler = ({ setCode }) => {

  return (
    <div className='compiler-main-container'>
      <MonacoEditor
        language="python"
        defaultValue='def xd'
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
