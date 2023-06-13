import { useState, useEffect } from 'react';

export const useAvailableType = (path, unlockedPath) => {
    const [typeInfo, setTypeInfo] = useState(null)
    let moracha, moreq, cracha, creq

    const available = (id, rc, rq, urc, urq) => {
        const unlocked = unlockedPath.find(item => item.id_subtema === id)
        if(unlocked != null){
            if (!unlocked.superado) {
                if (rc <= urc || rq <= urq) {
                    return false
                } else {
                    return true
                }
            }
        }else{
            return null
        }
    }

    useEffect(() => {
        if (path != null && unlockedPath != null) {
            const updatedTypeInfo = {}
            path.forEach((subtem) => {
                moracha = unlockedPath.find(item => item.id_subtema === subtem.id)?.user_racha_om || 0
                moreq = unlockedPath.find(item => item.id_subtema === subtem.id)?.user_progreso_om || 0
                cracha = unlockedPath.find(item => item.id_subtema === subtem.id)?.user_racha_codigo || 0
                creq = unlockedPath.find(item => item.id_subtema === subtem.id)?.user_progreso_codigo || 0

                updatedTypeInfo[subtem.id] = {
                    "mo": {
                        "racha": subtem.racha_om,
                        "requeridos": subtem.requeridos_om,
                        "uRacha": moracha,
                        "uRequeridos": moreq,
                        "available": available(subtem.id, subtem.racha_om, subtem.requeridos_om, moracha, moreq)
                    },
                    "c": {
                        "racha": subtem.racha_codigo,
                        "requeridos": subtem.requeridos_codigo,
                        "uRacha": cracha,
                        "uRequeridos": creq,
                        "available": available(subtem.id, subtem.racha_codigo, subtem.requeridos_codigo, cracha, creq)
                    }
                }
            })
            setTypeInfo(updatedTypeInfo);
        }

    }, [path, unlockedPath]);

    return { typeInfo };
}