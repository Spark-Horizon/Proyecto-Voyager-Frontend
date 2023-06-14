import { useState } from "react"
import { Link } from "react-router-dom";
import { CustomButton } from "../CustomButton";

import { ReactComponent as StrikeActive } from '../../assets/svg/icons/strikeStar1.svg';
import { ReactComponent as StrikeBlocked } from '../../assets/svg/icons/strikeStar2.svg';

import '../../styles/Path/subtemaCard.css'

export const SubtemaCard = (props) => {
    const typeInfo = props.typeInfo;
    const unlockedPath = props.unlockedPath;

    const [hidden, setHidden] = useState(true)

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

    // Mostrar requeridos (user/tema)
    const requeridos = (id_subtem, type) => {
        let reqs = (typeInfo[id_subtem][type].uRequeridos / typeInfo[id_subtem][type].requeridos) * 100
        return (
            <div className="subtema-requeridos">
                <div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{ height: '10px' }}>
                    <div class="mt-1 customProgress progress-bar progress-bar-striped progress-bar-animated" style={{ width: reqs + '%' }}/>
                </div>
            </div>
        )
    }

    // Rachas
    const generarStrikes = (n) => {
        const strikes = [];
        const empty = 5 - n;

        for (let i = 0; i < n; i++) {
            strikes.push(<StrikeActive key={i}/>);
        }

        for (let i = 0; i < empty; i++) {
            strikes.push(<StrikeBlocked key={i}/>);
        }
    
        return strikes;
    };
    // Mostrar racha (user/tema)
    const racha = (id_subtem, type) => {
        let strike = (typeInfo[id_subtem][type].uRacha / typeInfo[id_subtem][type].racha) * 100
        if (strike === 100) {
            strike = 5;
        } else if (strike >= 80) {
            strike = 4;
        } else if (strike >= 60) {
            strike = 3;
        } else if (strike >= 40) {
            strike = 2;
        } else if (strike >= 20) {
            strike = 1;
        } else {
            strike = 0;
        }
        return (
            <div className="excercise-racha mb-2">
                {generarStrikes(strike)}
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
            ${!hidden ? 'subtema-main-container-show' : 'subtema-main-container-hidden'}
            ${blocked(props.id) ? 'subtema-available' : 'subtema-blocked'}
            `}
        >
            <div className="subtema-title">
                <span
                onClick={()=> blocked(props.id) && setHidden(!hidden)}
                >
                    {props.title}
                </span>
            </div>
            <div className="subtema-info-container">
                {practice(props.id) ? (
                    <span>
                    MODO PRACTICA:
                    </span>
                ) : null}
                <div className="select">
                    <div className="btnResize excercise-link">
                        {racha(props.id, "mo")}
                        <Link
                            to={{ pathname: '/MOPage' }}
                            state={{ subtem: props.id, practice_mode: practice(props.id), path:(props.path), materia: (props.materia)}}
                            style={available(props.id, "mo")}>
                            <CustomButton text={"Opción Múltiple"} type={"btn btn-sm btnPrimary selectBtn"}/>
                        </Link>
                        {requeridos(props.id, "mo")}
                    </div>
                    <div className="btnResize excercise-link">
                        {racha(props.id, "c")}
                        <Link
                            to={{ pathname: '/Compiler' }}
                            state={{ subtem: props.id, practice_mode: practice(props.id), path:(props.path), materia: (props.materia)}}
                            style={available(props.id, "c")}>
                            <CustomButton text={"Código"} type={"btn btn-sm btnPrimary selectBtn"}/>
                        </Link>
                        {requeridos(props.id, "c")}
                    </div>
                </div>
            </div>
        </div>
    )
}
