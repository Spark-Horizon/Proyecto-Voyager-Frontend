import { CustomButton } from '../components/CustomButton'
import { MOInstructions } from "../components/MO/MOInstructions"
import { useState, useEffect } from 'react'
import { useGetPractica } from '../hooks/useGetPractica';
import { useLocation } from 'react-router-dom';

import '../styles/moPage.css' 

export const MOPage = () => {
    const [ problem_id, setProblemID ] = useState("");
    const { practica } = useGetPractica(useLocation().state.subtem, "MO");

    useEffect(() => {
        let problemId = ""; //Para pruebas, solo si no hay sesion activa (bug)
        if (practica != null) {
            problemId = practica.id_ejercicio;
        }
        setProblemID(problemId);
    }, [practica]);
    
    if(!practica){
        return <div>Cargando...</div>
    }

    const handleSkip = (e) => {
        e.preventDefault();
        // on progress
        return 0
    };

    const handleNext = () => {
        window.location.reload(); // Recargar la página
    };

    return(
        <div className="mo-route-container">
            <div className="mopage-main-container container-cc">
                <CustomButton type={'btn btnPrimary btn-sm'} func={handleSkip} text={'Saltar'}/>
                <MOInstructions problem_id={problem_id} attempt_id={practica.id} handleNext={handleNext}/>
            </div>
        </div>
    )
}