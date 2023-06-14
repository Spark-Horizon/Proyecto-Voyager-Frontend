import { getIntento } from '../../helpers/quizStudent/getIntento';
import { useState, useEffect } from 'react';

export const useGetIntento = (user_id, activity_id) => {
    const [ intento, setIntento ] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user_id && activity_id) {
            const fetchData = async () => {
                try {
                    const new_intento = await getIntento(user_id, activity_id);
                    setIntento(new_intento[0]);
                    //console.log("returned path: ", path[0]);
                } catch (error) {
                    console.log(error)
                    setError(error);
                }
            };

            fetchData();
        }

    }, [user_id, activity_id]);

    return { intento, error };
}