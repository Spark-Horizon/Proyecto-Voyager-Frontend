import { MOInstructions } from "../components/MO/MOInstructions"
import { useState, useEffect } from 'react'
import { useGetPractica } from '../hooks/useGetPractica';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAvailableType } from "../hooks/useAvailableType";
import { useGetUnlocked } from "../hooks/useGetUnlocked";

import '../styles/moPage.css'

export const MOPage = () => {
    // Variable de informacion almacenada para la ruta
    const location = useLocation().state
    const navigate = useNavigate()
    // Settear problem id y buscar su practica
    const [problem_id, setProblemID] = useState("");
    const { practica } = useGetPractica(location.subtem, "MO");
    // Hook de bloqueo de nivel
    const { unlockedPath } = useGetUnlocked(location.materia);
    const { typeInfo } = useAvailableType(location.path, unlockedPath);
    // Hook de modo practica
    const [practiceMode, setPracticeMode] = useState(location.practiceMode);

    // Cambiar el ejercicio
    useEffect(() => {
        if (practica != null) {
            const problemId = practica.id_ejercicio;
            setProblemID(problemId);
        }
    }, [practica]);

    // Cambiar el modo practica
    useEffect(() => {
        if(unlockedPath != null){
            const actualMode = unlockedPath.find(item => item.id_subtema === location.subtem && item.superado)
            setPracticeMode(actualMode)
        }
    }, [unlockedPath])

    // Esperar a cargar la informacion de los hooks
    if (!practica || !typeInfo || !unlockedPath) {
        return <div>Cargando...</div>
    }

    // Funcion para el boton de siguiente
    const handleNext = () => {
        if(typeInfo[location.subtem]["mo"].available === false){
            navigate(-1)
        }else{
            window.location.reload(); // Recargar la página
        }
    };

    return (
        <div className="mo-route-container">
            <div className="mopage-main-container container-cc">
                {practiceMode ? (
                    <span>
                        MODO PRACTICA:
                        <br />
                    </span>
                ) : null}
                <MOInstructions problem_id={problem_id} attempt_id={practica.id} handleNext={handleNext} available={typeInfo[location.subtem]["mo"].available} practiceMode={practiceMode} />
            </div>
        </div>
    )
}