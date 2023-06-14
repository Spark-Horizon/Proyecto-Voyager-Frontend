import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT

export const submitIntento = async (id_intento) => {
    try {
        const options = {
            method: "post",
            url: `http://${backendUrl}:${port}/quizStudent/submitRespuesta/`,
            headers: {
                "Content-Type": "application/json"
            },
            data: {id_intento: id_intento}
        }

        const response = await axios(options)
        console.log(response);

    } catch (error) {
        console.log(error)
        throw error
    }
}
