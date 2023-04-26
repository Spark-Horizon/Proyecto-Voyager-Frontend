import { useEffect, useState } from "react"
import { submit } from "../helpers/indexHelpers";

export const useRunSubmit = () => {
    const [stdOut, setStdOut] = useState(null);
    const [compInfo, setCompInfo] = useState(null);
    const [stdErr, setStdErr] = useState(null);
    const [axiosError, setAxiosError] = useState(null);
    const [submitData, setSubmitData] = useState(null);

    const fetchSubmissionData = async (url, method) => {
        try {
            console.log('fetching...', url, method)
            const data = await submit(url, method, submitData);
            const { compInfo, stdout, stderr } = data;
            console.log(data)

            setCompInfo(compInfo);
            setStdOut(stdout);
            setStdErr(stderr);
        } catch (error) {
            console.log(error)
            setAxiosError(error);
        }
    }
    

    return {
        compInfo,
        stdOut,
        stdErr,
        axiosError,
        setSubmitData,
        fetchSubmissionData
    }
}
