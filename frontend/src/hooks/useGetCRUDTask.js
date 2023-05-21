import { getUpdateOMExercise, getUpdateCodeExercise, getCreateOMExercise, getCreateCodeExercise, getDeleteExercise, getFilAutorTask, getFilAutorizacionTask, getFilDificultadTask, getFilSubtemaTask, getFilTipoTask } from "../helpers/getCRUDTask.js";
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

export const useGetDeleteExercise = (id) => {
    const [data_delete, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultado = await getDeleteExercise(id);
                setProblemData(resultado);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return { data_delete, error };
}

export const useGetCreateCodeExercise = (autorizado, tipo, subtema, author, title, description, difficulty, driver, tests) => {
    const [data_code_create, setProblemData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultado = await getCreateCodeExercise(autorizado, tipo, subtema, author, title, description, difficulty, driver, tests);
                setProblemData(resultado);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return { data_code_create, error };
};

export const useGetCreateOMExercise = (autorizado, tipo, subtema, author, title, description, difficulty, answer, hints, options) => {
    const [data_om_create, setProblemData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultado = await getCreateOMExercise(autorizado, tipo, subtema, author, title, description, difficulty, answer, hints, options);
                setProblemData(resultado);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return { data_om_create, error };
};

export const useGetUpdateCodeExercise = (id, autorizado, tipo, subtema, author, title, description, difficulty, driver, tests) => {
    const [data_code_update, setProblemData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultado = await getUpdateCodeExercise(id, autorizado, tipo, subtema, author, title, description, difficulty, driver, tests);
                setProblemData(resultado);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return { data_code_update, error };
};

export const useGetUpdateOMExercise = (id, autorizado, tipo, subtema, author, title, description, difficulty, answer, hints, options) => {
    const [data_om_update, setProblemData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultado = await getUpdateOMExercise(id, autorizado, tipo, subtema, author, title, description, difficulty, answer, hints, options);
                setProblemData(resultado);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return { data_om_update, error };
};