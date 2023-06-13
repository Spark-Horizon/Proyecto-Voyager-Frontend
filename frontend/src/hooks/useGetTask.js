import { getTask } from "../helpers/indexHelpers.js";
import { useState, useEffect } from 'react';

export const useGetTask = (problem_id) => {
    const [data, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Verifica que problem_id no sea null antes de hacer la llamada
            if (problem_id) {
                try {
                    const archivo = await getTask(problem_id);
                    console.log("Ejercicio:", archivo);
                    setProblemData(archivo);
                } catch (error) {
                    setError(error);
                }
            }
        };

        fetchData();
    }, [problem_id]);

    return { data, error };
}
