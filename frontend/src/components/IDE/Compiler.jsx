import CodeEditor from '@uiw/react-textarea-code-editor';
import MonacoEditor from '@uiw/react-monacoeditor';

import '../../styles/Compiler.css'

import { CustomButton } from '../buttons/CustomButton';
import { useRunSubmit } from '../../hooks/useRunSubmit';

export const Compiler = ({tests, driver, setCode, code, setSubmitData, fetchSubmissionData}) => {
    // Use effect that fetches data from the backend
    // useEffect(() => {
        
    // }, [])
    
    const runCode = () => {
        const runData = {
            code: code,
            tests: tests,
            driver: driver
        }

        setSubmitData(runData);
        fetchSubmissionData(`http://3.15.39.127:3000/compiler/problem/run`, 'post');
    }

    return (
        <>
            <div className='compiler-main-container'>
                <div className="compiler-buttons-container">
                    <CustomButton 
                        text={"Run"} 
                        func={ runCode } 
                        customClass={"run"} 
                    />
                </div>
                <MonacoEditor
                    language="python"
                    onChange={(newValue, e) => {
                        setCode(newValue)
                    }}
                    options={{
                        theme: 'vs-dark',
                    }}
                />
            </div>
        </>
    )
}