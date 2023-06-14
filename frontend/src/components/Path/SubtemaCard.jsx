import { useState } from "react"
import { Link } from "react-router-dom";
import { CustomButton } from "../CustomButton";

import '../../styles/Path/subtemaCard.css'

export const SubtemaCard = (props) => {
    const typeInfo = props.typeInfo;
    const unlockedPath = props.unlockedPath;

    // Estilo del subtema segun este disponible o no
    const blocked = (id_subtem) => {
        return unlockedPath.find(item => item.id_subtema === id_subtem)
    }

    // Estilo de link segun el subtema haya sido superado o no
    const practice = (id_subtem) => {
        if(unlockedPath.find(item => item.id_subtema === id_subtem && item.superado === true)){
            return true
        }else{
            return false
        }
    }

    // Mostrar racha (user/tema) y requeridos (user/tema)
    const goals = (id_subtem, type) => {
        let racha = (typeInfo[id_subtem][type].uRacha / typeInfo[id_subtem][type].racha) * 100
        let requeridos = (typeInfo[id_subtem][type].uRequeridos / typeInfo[id_subtem][type].requeridos) * 100
        return (
            <div className="goals">
                <div className="subtema-racha">
                    <div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{ height: '5px' }}>
                        <div class="progress-bar" style={{ width: racha + '%' }}/>
                    </div>
                </div>
                <div className="subtema-requeridos">
                    <div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{ height: '10px' }}>
                        <div class="customProgress progress-bar progress-bar-striped progress-bar-animated" style={{ width: requeridos + '%' }}/>
                    </div>
                </div>
            </div>
        )
    }

    // Mostrar si el tipo de ejercicio (mo/c) esta bloqueado o no disponible
    const available = (id_subtem, type) => {
        let color
        const value = typeInfo[id_subtem][type].available
        if (value === null) {
        color = 'grey'
        } else if (value === true) {
        color = 'blue'
        } else if (value === false) {
        color = 'red'
        }
        return { color: color }
    }

    return (
        <div
        className={
            `subtema-main-container
            ${blocked(props.id) ? 'subtema-available' : 'subtema-blocked'}
            `}
        >
            <span>
                {props.title}
            </span>
            <div className="subtema-info-container">
                {practice(props.id) ? (
                    <span>
                    MODO PRACTICA:
                    </span>
                ) : null}
                <div className="select">
                    <div className="btnResize excercise-link">
                        {goals(props.id, "mo")}
                        <Link
                            to={{ pathname: '/MOPage' }}
                            state={{ subtem: props.id, practice_mode: practice(props.id), path:(props.path), materia: (props.materia)}}
                            style={available(props.id, "mo")}>
                            <CustomButton text={"Opción Múltiple"} type={"btn btn-sm btnPrimary selectBtn"}/>
                        </Link>
                    </div>
                    <div className="btnResize excercise-link">
                        {goals(props.id, "c")}
                        <Link
                            to={{ pathname: '/Compiler' }}
                            state={{ subtem: props.id, practice_mode: practice(props.id), path:(props.path), materia: (props.materia)}}
                            style={available(props.id, "c")}>
                            <CustomButton text={"Código"} type={"btn btn-sm btnPrimary selectBtn"}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
