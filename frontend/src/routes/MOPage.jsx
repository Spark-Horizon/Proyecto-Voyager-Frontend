import { MOInstructions } from "../components/MO/MOInstructions"

export const MOPage = () => {
    const codeId = "TC1028_21_OM_10";
    return(
        <div>
            <MOInstructions problem_id={codeId}/>
        </div>
    )
}