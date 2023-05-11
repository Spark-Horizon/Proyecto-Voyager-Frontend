import { useEffect, useState } from "react"
import { submit } from "../helpers/indexHelpers";

export const useRunSubmit = () => {
    const [stdOut, setStdOut] = useState(null);
    const [compInfo, setCompInfo] = useState(null);
    const [stdErr, setStdErr] = useState(null);
    const [testsData, setTestsData] = useState(null);
    const [axiosError, setAxiosError] = useState(null);
    const [submitData, setSubmitData] = useState(null);

    const fetchSubmissionData = async (url, method) => {
        try {
            console.log('fetching...', url, method)
            console.log('submitdata: ', submitData)
            const data = await submit(url, method, submitData);
            const { compInfo, stdout, stderr, testsInfo } = data;
            console.log('------')
            console.log('Retrieved data: ', data)
            console.log('------')

            setCompInfo(compInfo);
            setStdOut(stdout);
            setStdErr(stderr);
            setTestsData(testsInfo);
        } catch (error) {
            console.log(error)
            setAxiosError(error);
        }
    }
    

    return {
        compInfo,
        stdOut,
        stdErr,
        testsData,
        axiosError,
        submitData,
        setSubmitData,
        fetchSubmissionData
    }
}
