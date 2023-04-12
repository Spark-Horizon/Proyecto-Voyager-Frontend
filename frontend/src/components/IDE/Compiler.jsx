import CodeEditor from '@uiw/react-textarea-code-editor';

import { useState } from 'react';

import '../../styles/Compiler.css'

export const Compiler = () => {
    const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

    return (
        <CodeEditor
            className='compiler'
            value={code}
            language="js"
            placeholder="Please enter JS code."
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            style={{
            fontSize: 12,
            backgroundColor: "#f5f5f5",
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
        />
    )
}