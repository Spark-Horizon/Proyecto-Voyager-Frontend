import { CustomButton } from '../components/CustomButton'
import { MOInstructions } from "../components/MO/MOInstructions"
import '../styles/moPage.css'

export const MOPage = () => {

    const handleSkip = (e) => {
        e.preventDefault();
        // on progress
        return 0
    };

    return(
        <div className="mo-route-container">
            <div className="mopage-main-container container-cc">
                <CustomButton type={'btn btnPrimary btn-sm'} func={handleSkip} text={'Saltar'}/>
                <MOInstructions/>
            </div>
        </div>
    )
}