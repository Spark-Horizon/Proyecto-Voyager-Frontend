import { MOInstructions } from "../components/MO/MOInstructions"
import '../styles/moPage.css'

export const MOPage = () => {
    return(
        <div className="mo-route-container">
            <div className="mopage-main-container container-cc">
                <MOInstructions/>
            </div>
        </div>
    )
}