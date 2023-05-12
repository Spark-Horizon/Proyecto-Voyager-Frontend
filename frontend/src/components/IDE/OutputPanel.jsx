import { useRef, useEffect } from 'react';
import { CustomButton } from '../CustomButton';
import { Console } from './Console';
import { TestCases } from './TestCases';
// Utiliza `backendUrl` en lugar de la dirección IP o el dominio directamente.
const backendUrl = process.env.REACT_APP_BACKEND_URL;



export const OutputPanel = (
    {
        code, 
        tests, 
        testsData, 
        driver, 
        id, 
        compInfo, 
        stdOut, 
        stdErr, 
        submitData, 
        setSubmitData, 
        fetchSubmissionData
    }
    ) => {
    const isFirstRender = useRef(true);
    
    const runCode = () => {
        const runData = {
            code: code,
            tests: tests,
            driver: driver
        };

        setSubmitData(runData);
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
        const fetchData = async () => {
            try {
            await fetchSubmissionData(`http://${backendUrl}:3000/compiler/problem/run`, 'post');
            } catch (error) {
            console.log(error);
            }
        };

        fetchData();
        }
    }, [submitData]);

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
