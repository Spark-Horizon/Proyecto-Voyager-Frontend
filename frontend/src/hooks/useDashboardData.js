import axios from "axios";
import { useState } from "react";

export const useDashboardData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [axiosError, setAxiosError] = useState(null);

    const getData = async (url) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }

            setIsLoading(true);
            const responses = await axios.get(url, config);;
            
            const { data } = responses;
            
            console.log('Fetched data', data);
            
            setData(data);

            setIsLoading(false);
        } catch (error) {
            setAxiosError('Problemas con el servidor, intentar más tarde.');
        }
    }

    return {
        data,
        axiosError,
        isLoading,
        getData
    }
}
