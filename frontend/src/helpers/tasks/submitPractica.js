import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT

export const submitPractica = async (id_practica, answer) => {
    try {
        const options = {
            method: "post",
            url: `http://${backendUrl}:${port}/task/submitPractica/${id_practica}`,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(answer)
        }

        const response = await axios(options)
        console.log(response);

    } catch (error) {
        console.log(error)
        throw error
    }
}