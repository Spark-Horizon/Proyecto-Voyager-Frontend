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

    const fetchSubmissionData = async (url, method) => {
        try {
          setIsLoading(true);

          const data = await submit(url, method, submitData);

          setIsLoading(false);
          
          const { compInfo, stdout, stderr, testsInfo } = data;
          
          setCompInfo(compInfo);
          setStdOut(stdout);
          setStdErr(stderr);
          setTestsData(testsInfo);
        } catch (error) {
          console.log('failed to fetch')
          if (error.code === 'ECONNREFUSED') {
            // Manejar el error de conexión rechazada aquí
            // Por ejemplo, mostrar un mensaje de error al usuario
            console.error('Error de conexión rechazada:', error.message);
          } else {
            // Manejar otros errores aquí
            setAxiosError(error);
          }
          setIsLoading(false);
        }
      }
      

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
