import { getActivitiesTask, getActivityTask, getActivityExercises, getNameTask, getDeleteActivity, getCreateActivity, getUpdateActivity } from "../helpers/getTeacherTask";
import { useState, useEffect, useCallback } from 'react';

export const useGetActivitiesTask = (id, order, hier) => {
    const [data_activities, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const resultado = await getActivitiesTask(id, order, hier);
            setProblemData(resultado);
        } catch (error) {
            setError(error);
        }
    }, []);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    return { data_activities, error, refetchDataActivities: fetchData };
}

export const useGetActivityTask = (id) => {
    const [data_activity, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id){
                    const resultado = await getActivityTask(id);
                    setProblemData(resultado);
                }
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [id]);

    return { data_activity, error };
}

export const useGetActivityExercises = (id) => {
    const [data_activity_exercises, setProblemData] = useState(null);
    const [error, setError] = useState(null);
    const [loading_activityEx, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            if (id){
                const resultado = await getActivityExercises(id);
                setProblemData(resultado);
                console.log("Desde la BD:", data_activity_exercises);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    const refetchDataActivityExercises = useCallback(async () => {
        await fetchData(); // Call the fetchData function when refetch is invoked
      }, [fetchData]);

    return { data_activity_exercises, error, loading_activityEx, refetchDataActivityExercises };
}

export const useGetNameTask = (id) => {
    const [data_name, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id){
                    const resultado = await getNameTask(id);
                    setProblemData(resultado);
                }
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [id]);

    return { data_name, error };
}

export const useGetDeleteActivity = (id) => {
    const [data_delete, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultado = await getDeleteActivity(id);
                setProblemData(resultado);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return { data_delete, error };
}

export const useGetCreateActivity = (titulo, inicio, fin, intentos, bloqueo, disponible, visible, id_grupo, ejercicios) => {
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getCreateActivity(titulo, inicio, fin, intentos, bloqueo, disponible, visible, id_grupo, ejercicios);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return {error };
};

export const useGetUpdateActivity = (id, titulo, inicio, fin, intentos, bloqueo, disponible, visible, ejercicios) => {
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUpdateActivity(id, titulo, inicio, fin, intentos, bloqueo, disponible, visible, ejercicios);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return {error };
};