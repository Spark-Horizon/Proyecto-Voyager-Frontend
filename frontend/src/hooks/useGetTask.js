import { getTask } from "../helpers/indexHelpers.js";
import { getCRUDTask } from "../helpers/indexHelpers.js";
import { useState, useEffect } from 'react';

export const useGetCodeTask = (problem_id) => {
    const [data, setProblemData] = useState(null);
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

    return { data, error };
}

export const useGetMOTask = (problem_id) => {
    const [data, setProblemData] = useState(null);
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

    return { data, error };
}

export const useGetCRUDTask = (fil1, fil2, fil3, fil4, fil5, order, hier) => {
    const [data, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const archivo = await getCRUDTask(fil1, fil2, fil3, fil4, fil5, order, hier);
                console.log(archivo);
                const { id_resultado, titulo, autor, subtema, tipo_resultado, dificultad, autorizado_resultado } = archivo;
                setProblemData({ id_resultado, titulo, autor, subtema, tipo_resultado, dificultad, autorizado_resultado });
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [fil1, fil2, fil3, fil4, fil5, order, hier]);

    return { data, error };
}