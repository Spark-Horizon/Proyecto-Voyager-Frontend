import { getTask } from "../helpers/indexHelpers.js";
import { useState, useEffect } from 'react';

export const useGetCodeTask = (problem_id) => {
    const [data_code, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const archivo = await getTask(problem_id);
                console.log(archivo);
                const { id, author, title, description, topic, difficulty, driver, tests } = archivo;
                setProblemData({ id, author, title, description, topic, difficulty, driver, tests });
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [problem_id]);

    return { data_code, error };
}

export const useGetMOTask = (problem_id) => {
    const [data_om, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const archivo = await getTask(problem_id);
                console.log(archivo);
                const { id, author, title, description, topic, difficulty, answer, hint, options } = archivo;
                setProblemData({ id, author, title, description, topic, difficulty, answer, hint, options });
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [problem_id]);

    return { data_om, error };
}