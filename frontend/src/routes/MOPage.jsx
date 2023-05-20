import { MOInstructions } from "../components/MO/MOInstructions"

export const MOPage = ({ code_id }) => {
    code_id = "TC1028_21_OM_10"
    return(
        <div>
            <MOInstructions problem_id={code_id}/>
        </div>
    )
}