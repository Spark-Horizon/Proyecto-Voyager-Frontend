import { getIntento } from '../../helpers/quizStudent/getIntento';
import { useState, useEffect } from 'react';

export const useGetIntento = (user_id, activity_id) => {
    const [intento, setIntento] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("USEGENTINTENTOOOO>>", user_id, activity_id);
        if (user_id != null && activity_id != null) {
            const fetchData = async () => {
                try {
                    const new_intento = await getIntento(user_id, activity_id);
                    setIntento(new_intento);
                } catch (error) {
                    console.log(error)
                    setError(error);
                }
            }

            fetchData();
        };

    }, [user_id, activity_id]);

    return { intento, error };
}