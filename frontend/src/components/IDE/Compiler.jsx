import CodeEditor from '@uiw/react-textarea-code-editor';
import '../../styles/Compiler.css'

import { useState } from 'react';

import { CustomButton } from '../buttons/CustomButton';
import { useSubmit } from '../../hooks/useSubmit';


export const Compiler = () => {
    const [code, setCode] = useState(`def main():\n    return 0`);
    const { stdOut, error, fetchSubmissionData } = useSubmit(code);
    
    return (
        <>
            <div className='compiler-container'>
                <div className="compiler-buttons-container">
                    <CustomButton text={"Run"} func={ fetchSubmissionData } customClass={"run"} />
                    <CustomButton text={"Submit"} func={ fetchSubmissionData } customClass={"submit"} />
                </div>
                <CodeEditor
                    value={code}
                    language="py"
                    placeholder="Please enter Python code."
                    onChange={(evn) => setCode(evn.target.value)}
                    data-color-mode="dark"
                    padding={10}
                    style={{
                        fontSize: 12,
                        borderRadius: '0px 0px 10px 10px',
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