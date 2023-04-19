import CodeEditor from '@uiw/react-textarea-code-editor';
import '../../styles/Compiler.css'

import { useState } from 'react';

import { CustomButton } from '../buttons/CustomButton';
import { useSubmit } from '../../hooks/useSubmit';


export const Compiler = () => {
    const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
    const { stdOut, error, fetchSubmissionData } = useSubmit(code);
    
    return (
        <>
            <div className='compiler-container'>
                <div className="compiler-buttons-container">
                    <CustomButton text={"Submit"} func={ fetchSubmissionData } customClass={"submit"} />
                </div>
                <CodeEditor
                    value={code}
                    language="py"
                    placeholder="Please enter Python code."
                    onChange={(evn) => setCode(evn.target.value)}
                    data-color-mode="dark"
                    padding={15}
                    className="compiler"
                    style={{
                        overflow: 'scroll',
                        fontSize: 12,
                        borderRadius: '20px',
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            </div>
            {
                stdOut && <p>{stdOut}</p>
            }
        </>
    )
}