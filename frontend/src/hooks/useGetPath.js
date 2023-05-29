import { getPath, getUnlocked } from "../helpers/indexHelpers.js";
import { useState, useEffect } from 'react';

export const useGetPath = (materia_id) => {
    const [data, setPathData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const path = await getPath(materia_id);
                setPathData(path);
                //console.log(path);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [materia_id]);

    return { data, error };
}

export const useGetUnlocked = (materia_id) => {
    const [uData, setUData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const unlocked = await getUnlocked(materia_id);
                setUData(unlocked);
                //console.log(unlocked);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [materia_id]);

    return { uData, error };
}