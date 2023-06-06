import { getPath } from "../helpers/indexHelpers.js";
import { useState, useEffect } from 'react';

export const useGetPath = (materia_id) => {
    const [path, setPath] = useState(null);
    const [temas, setTemas] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const path = await getPath(materia_id);
                setPath(path);

                //console.log("useGetPath: ", path);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [materia_id]);

    useEffect(() => {
        if (path != null) {
            const temas = {};
            path.forEach((subtem) => {
                const tema_id = subtem.id_tema;
                if (!temas[tema_id]) {
                    temas[tema_id] = {
                        nombre: subtem.tema_nombre,
                        subtemas: [],
                    }
                }
                temas[tema_id].subtemas.push(subtem);
            });
            setTemas(temas)

            //console.log("useGetPath2: ", temas)
        }
    }, [path])


    return { path, temas, error };
}