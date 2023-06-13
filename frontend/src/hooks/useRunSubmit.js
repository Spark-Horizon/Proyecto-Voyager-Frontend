import { useEffect, useState } from "react"
import { submit } from "../helpers/indexHelpers";

export const useRunSubmit = () => {
    const [stdOut, setStdOut] = useState(null);
    const [compInfo, setCompInfo] = useState(null);
    const [stdErr, setStdErr] = useState(null);
    const [testsData, setTestsData] = useState(null);
    const [axiosError, setAxiosError] = useState(null);
    const [submitData, setSubmitData] = useState(null);

    const [isLoading, setIsLoading] = useState(false);


    const fetchSubmissionData = async (url, method, data) => {
      try {
        setIsLoading(true);
    
        // Ahora, data es lo que pasamos a la función, no el estado submitData
        console.log(data)
    
        const responseData = await submit(url, method, data);
        console.log("Response Data:", responseData);

        setIsLoading(false);
        
        const { compInfo, stdout, stderr, testsInfo } = responseData;
        
        setCompInfo(compInfo);
        setStdOut(stdout);
        setStdErr(stderr);
        setTestsData(testsInfo);
      } catch (error) {
        console.log('failed to fetch')
        if (error.code === 'ECONNREFUSED') {
          console.error('Error de conexión rechazada:', error.message);
        } else {
          setAxiosError(error);
        }
        setIsLoading(false);
      }
    };
    

    return {
        data: {
            compInfo,
            stdOut,
            stdErr,
            testsData,
            axiosError,
            submitData
        },
        setSubmitData,
        fetchSubmissionData,
        isLoading
    }
}
