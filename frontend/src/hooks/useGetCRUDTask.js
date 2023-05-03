import { getFilAutorTask, getFilAutorizacionTask, getFilDificultadTask, getFilSubtemaTask, getFilTipoTask } from "../helpers/getCRUDTask.js";
import { getCRUDTask } from "../helpers/indexHelpers.js";
import { useState, useEffect } from 'react';

export const useGetCRUDTask = (fil1, fil2, fil3, fil4, fil5, order, hier) => {
    const [data_result, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultado = await getCRUDTask(fil1, fil2, fil3, fil4, fil5, order, hier);
                setProblemData(resultado);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [fil1, fil2, fil3, fil4, fil5, order, hier]);

    return { data_result, error };
}

export const useGetFilAutorTask = () => {
    const [data_autor, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultado = await getFilAutorTask();
                setProblemData(resultado);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return { data_autor, error };
}

export const useGetFilSubtemaTask = () => {
    const [data_subtema, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultado = await getFilSubtemaTask();
                setProblemData(resultado);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return { data_subtema, error };
}

export const useGetFilTipoTask = () => {
    const [data_tipo, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultado = await getFilTipoTask();
                setProblemData(resultado);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return { data_tipo, error };
}

export const useGetFilDificultadTask = () => {
    const [data_dificultad, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultado = await getFilDificultadTask();
                setProblemData(resultado);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return { data_dificultad, error };
}

export const useGetFilAutorizacionTask = () => {
    const [data_autorizacion, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultado = await getFilAutorizacionTask();
                setProblemData(resultado);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return { data_autorizacion, error };
}