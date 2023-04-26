import { CustomButton } from '../buttons/CustomButton';
import { useRunSubmit } from '../../hooks/useRunSubmit';
import { Console } from './Console';

export const OutputPanel = ({code, tests, driver, id, compInfo, stdOut, stdErr}) => {
    const { setSubmitData, fetchSubmissionData } = useRunSubmit();

    const submitCode = async () => {
        const submitData = {
            code,
            tests,
            driver,
            id
        }

        setSubmitData(submitData);
        fetchSubmissionData(`http://3.15.39.127:3000/compiler/problem/${id}/submit`, 'post');
    }

    return (
        <div className="output-panel-main-container">
            <CustomButton 
                text={"Submit"} 
                func={ submitCode } 
                customClass={"submit"} 
            />
            <Console stdOut={stdOut}/>
        </div>
    )
}
