import { useEffect, useState } from "react"
import { submit } from "../helpers/indexHelpers";

export const useSubmit = (initialCode) => {
    const [code, setCode] = useState(initialCode)
    const [stdOut, setStdOut] = useState(null);
    const [error, setError] = useState(null);

    const fetchSubmissionData = async () => {
        try {
            const stdout = await submit(code);

            setStdOut(stdout);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        setCode(initialCode);
    }, [initialCode])
    

    return {
        stdOut,
        error,
        fetchSubmissionData
    }
}
