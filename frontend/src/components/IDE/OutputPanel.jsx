import { CustomButton } from '../CustomButton';
import { Console } from './Console';
// Utiliza `backendUrl` en lugar de la dirección IP o el dominio directamente.
const backendUrl = process.env.REACT_APP_BACKEND_URL;



export const OutputPanel = ({code, tests, driver, id, compInfo, stdOut, stdErr, setSubmitData, fetchSubmissionData}) => {
    const submitCode = async () => {
        const submitData = {
            code,
            tests,
            driver,
            id
        }

        setSubmitData(submitData);
        fetchSubmissionData(`http://${backendUrl}:3000/compiler/problem/${id}/submit`, 'post');
    }

    return (
        <div className="output-panel-main-container">
            <CustomButton 
                text={"Submit"} 
                func={ submitCode } 
                customClass={"submit"} 
            />
            <Console stdOut={stdOut || stdErr || compInfo}/>
        </div>
    )
}
