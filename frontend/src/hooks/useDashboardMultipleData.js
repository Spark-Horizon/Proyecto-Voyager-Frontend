import axios from "axios";
import { useState } from "react";

export const useDashboarMultipledData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [axiosError, setAxiosError] = useState(null);

    const getData = async (urls) => {
        try {
            const promises = [];
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
    
            setIsLoading(true);
    
            urls.forEach(url => {
                promises.push(axios.get(url, config));
            });
    
            const responses = await Promise.all(promises);

            
            const responseData = responses.map(response => response.data);

            console.log('DATA FROM USEDMD: ', responseData);

            setData(responseData);
            
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
