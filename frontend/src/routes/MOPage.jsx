import { CustomButton } from "../components/CustomButton";
import { MOInstructions } from "../components/MO/MOInstructions"
import { useState, useEffect } from 'react'
import { useGetPractica } from '../hooks/useGetPractica';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAvailableType } from "../hooks/useAvailableType";
import { useGetUnlocked } from "../hooks/useGetUnlocked";
import { useGetTask } from "../hooks/useGetTask";
import { submitPractica } from "../helpers/indexHelpers";

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
    // Hook de ejercicio
    const { data } = useGetTask(problem_id)

    // Cambiar el ejercicio
    useEffect(() => {
        if (practica != null) {
            const problemID = practica.id_ejercicio;
            setProblemID(problemID);
        }
    }, [practica]);

    // Cambiar el modo practica
    useEffect(() => {
        if (unlockedPath != null) {
            const actualMode = unlockedPath.find(item => item.id_subtema === location.subtem && item.superado)
            setPracticeMode(actualMode)
        }
    }, [unlockedPath])

    // Esperar a cargar la informacion de los hooks
    if (!practica || !typeInfo || !unlockedPath || !data) {
        return <div>Cargando...</div>
    }

    // Funcion para el boton de submit
    const submitFunc = (respuesta, correcto) => {
        submitPractica(practica.id, respuesta, correcto)
    }

    // Funcion para el boton de siguiente
    const handleNext = () => {
        if (typeInfo[location.subtem]["mo"].available === false) {
            navigate(-1)
        } else {
            window.location.reload(); // Recargar la página
        }
    };

    const handleRender = () => {
        if (!typeInfo[location.subtem]["mo"].available && !practiceMode) {
            return (
                <div className="mo-instructions">
                    <div className="mo-instructions-content">
                        <div className="mo-instructions-info">
                            <div className="code-instructions-title">
                                <h3>Resuelve la parte de Codigo antes de avanzar.</h3>
                            </div>
                        </div>
                        <div className="mo-instructions-submit container-cc">
                            <CustomButton type='btn' text={'Regresar al Path'} func={handleNext} />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                practiceMode ? (
                    <div className="mopage-main-container container-cc">
                        MODO PRACTICA:
                        <br />
                        <MOInstructions data={data} handleNext={handleNext} practiceMode={practiceMode} submitFunc={submitFunc} />
                    </div>
                ) : (
                    <div className="mopage-main-container container-cc">
                        <MOInstructions data={data} handleNext={handleNext} practiceMode={practiceMode} submitFunc={submitFunc} />
                    </div>
                )
            )
        }
    }

    return (
        <div className="mo-route-container">
            <div className="mopage-main-container container-cc">
                {handleRender()}
            </div>
        </div >
    )
}