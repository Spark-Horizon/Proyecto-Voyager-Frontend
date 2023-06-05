import { getCreateAddRandomExercise, getCRUDTaskTeacher, getExerciseTask, getUpdateOMExercise, getUpdateCodeExercise, getCreateOMExercise, getCreateCodeExercise, getDeleteExercise, getFilAutorTask, getFilAutorizacionTask, getFilDificultadTask, getFilSubtemaTask, getFilTipoTask } from "../helpers/getCRUDTask.js";
import { getCRUDTask } from "../helpers/indexHelpers.js";
import { useState, useEffect } from 'react';

export const useGetCRUDTask = (fil1, fil2, fil3, fil4, fil5, order, hier, rol, id) => {
    const [data_result, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (rol == 'Administrador'){
                try{
                    const resultado = await getCRUDTask(fil1, fil2, fil3, fil4, fil5, order, hier);
                    setProblemData(resultado);
                } catch (error) {
                    setError(error);
                }
            }
            else{
                try {
                    const resultado = await getCRUDTaskTeacher(fil1, fil2, fil3, fil4, fil5, order, hier, id);
                    setProblemData(resultado);
                } catch (error) {
                    setError(error);
                }
            }
        };

        fetchData();
    }, [fil1, fil2, fil3, fil4, fil5, order, hier, rol, id]);

    return { data_result, error };
}

export const useGetCreateAddRandomExercise =  (tipo, subtema, difficulty) => {
    const [data_random, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (tipo, subtema, difficulty){
                    const resultado = await getCreateAddRandomExercise(tipo, subtema, difficulty);
                    setProblemData(resultado);
                }
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [tipo, subtema, difficulty]);

    return { data_random, error };
}

export const useGetExerciseTask = (problem_id) => {
    const [data_exercise, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (problem_id){
                    const resultado = await getExerciseTask(problem_id);
                    const { id, autorizado, tipo,  archivo, id_subtema, id_autor } = resultado;
                    setProblemData({ id, autorizado, tipo,  archivo, id_subtema, id_autor });
                }
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [problem_id]);

    return { data_exercise, error };
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
                console.log(resultado);
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