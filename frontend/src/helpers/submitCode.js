import axios from "axios";

/* SUBMIT FUNCTION
    This function submits a post petition to the backend
    so the code can be compiled and parsed.

    This petition returns only data in order to make this function
    more customizable.
*/
export const submit = async (url, method, submitData) => {
    try {
        const options = {
            url: url,
            method: method,
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: JSON.stringify(submitData)
        };          

        const response = await axios(options);

        const { data } = response;

        return data;
    } catch(error) {
        return JSON.stringify(error);
    }
}

