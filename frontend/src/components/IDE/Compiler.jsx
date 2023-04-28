import MonacoEditor from '@uiw/react-monacoeditor';

import '../../styles/Compiler.css'

import { CustomButton } from '../CustomButton';

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
                        type={"run"} 
                    />
                </div>
                <MonacoEditor
                    language="python"
                    className='test'
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