import { MOInstructions } from "../components/MO/MOInstructions"
import { useState, useEffect } from 'react'
import { useGetPractica } from '../hooks/useGetPractica';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/AuthContext";

import '../styles/moPage.css'

export const MOPage = () => {
    const { user } = useAuth();
    const user_id = user.id;
    const location = useLocation().state
    const navigate = useNavigate()
    const [problem_id, setProblemID] = useState("");
    const { practica } = useGetPractica(location.subtem, "MO", user_id);

    useEffect(() => {
        let problemId = ""; //Para pruebas, solo si no hay sesion activa (bug)
        if (practica != null) {
            problemId = practica.id_ejercicio;
        }
        setProblemID(problemId);
    }, [practica]);

    if (!practica) {
        return <div>Cargando...</div>
    }

    console.log(location.available);

    const handleNext = () => {
        if(location.available === false){
            navigate(-1)
        }else{
            window.location.reload(); // Recargar la página
        }
    };

    return (
        <div className="mo-route-container">
            <div className="mopage-main-container container-cc">
                {location.practice_mode ? (
                    <span>
                        MODO PRACTICA:
                        <br />
                    </span>
                ) : null}
                <MOInstructions problem_id={problem_id} attempt_id={practica.id} handleNext={handleNext} available={location.available} />
            </div>
        </div>
    )
}