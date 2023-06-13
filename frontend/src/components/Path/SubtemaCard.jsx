import { useState } from "react"
import { Link } from "react-router-dom";
import '../../styles/Path/subtemaCard.css'

export const SubtemaCard = (props) => {

    const typeInfo = props.typeInfo;
    const unlockedPath = props.unlockedPath;

    const [hidden, setHidden] = useState(false);

    // Estilo del subtema segun este disponible o no
    const blocked = (id_subtem) => {
        return unlockedPath.find(item => item.id_subtema === id_subtem)
    }

    // Estilo de link segun el subtema haya sido superado o no
    const practice = (id_subtem) => {
        return unlockedPath.find(item => item.id_subtema === id_subtem && item.superado)
    }

    // Mostrar racha (user/tema) y requeridos (user/tema)
    const goals = (id_subtem, type) => {
        return (
        <span>
            Racha: {typeInfo[id_subtem][type].uRacha}/{typeInfo[id_subtem][type].racha}
            Requeridos: {typeInfo[id_subtem][type].uRequeridos}/{typeInfo[id_subtem][type].requeridos}
        </span>
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
            `mb-2 subtema-main-container
            ${!hidden ? 'subtema-main-container-hidden' : ''}
            ${blocked(props.id) ? 'subtema-available' : 'subtema-blocked'}
            `}
        >
            <span
            onClick={()=> blocked(props.id) && setHidden(!hidden)}
            >
                {props.title}
            </span>
            <div className="subtema-info-container">
                {practice(props.id) ? (
                    <span>
                    MODO PRACTICA:
                    </span>
                ) : null}
                {goals(props.id, "mo")}
                <Link
                    to={{ pathname: '/MOPage' }}
                    state={{ subtem: props.id, practice_mode: props.practice, available: typeInfo[props.id]["mo"].available }}
                    style={available(props.id, "mo")}>
                    Opción Múltiple</Link>
                {goals(props.id, "c")}
                <Link
                    to={{ pathname: '/Compiler' }}
                    state={{ subtem: props.id }} //practicemode?
                    style={available(props.id, "c")}>
                    Código
                </Link>
            </div>
        </div>
    )
}

/*
<div>
    <span style={setStyle(subtem.id)}>{subtem.nombre}</span>
    <br />
    {practice(subtem.id) ? (
        <span>
        MODO PRACTICA:
        <br />
        </span>
    ) : null}
    {goals(subtem.id, "mo")}
    <br />
    <Link
        to={{ pathname: '/MOPage' }}
        state={{ subtem: subtem.id, practice_mode: practice(subtem.id), available: typeInfo[subtem.id]["mo"].available }}
        style={available(subtem.id, "mo")}>
        Opción Múltiple</Link>
    <br />
    {goals(subtem.id, "c")}
    <br />
    <Link
        to={{ pathname: '/Compiler' }}
        state={{ subtem: subtem.id }} //practicemode?
        style={available(subtem.id, "c")}>
        Código
    </Link>
</div>
*/
