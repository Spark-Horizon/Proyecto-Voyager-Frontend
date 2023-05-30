import { MOInstructions } from "../components/MO/MOInstructions"
import '../styles/moPage.css'

export const MOPage = () => {
    const codeId = "TC1028_21_OM_10";
    return(
        <div className="mo-route-container">
            <div className="mopage-main-container container-cc">
                <MOInstructions problem_id={codeId}/>
            </div>
        </div>
    )
}