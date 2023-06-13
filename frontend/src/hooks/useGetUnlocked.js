import { getUnlocked } from "../helpers/indexHelpers";
import { useState, useEffect } from 'react';

export const useGetUnlocked = (materia_id, user_id) => {
    const [unlockedPath, setUnlockedPath] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const unlocked = await getUnlocked(materia_id, user_id);
                setUnlockedPath(unlocked);
                //console.log(unlocked);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [materia_id]);

    return { unlockedPath, error };
}