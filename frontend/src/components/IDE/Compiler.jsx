import MonacoEditor from '@uiw/react-monacoeditor';

import '../../styles/Compiler.css'

import { CustomButton } from '../CustomButton';

const backendUrl = process.env.REACT_APP_BACKEND_URL; // Utiliza `backendUrl` en lugar de la dirección IP o el dominio directamente.


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
        fetchSubmissionData(`http://${backendUrl}:3000/compiler/problem/run`, 'post');
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