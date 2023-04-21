import axios from "axios";

export const submit = async (code) => {
    try {
        let data = JSON.stringify({
            "run_spec": {
              "language_id": "python3",
              "sourcecode": `${code}`,
              "input": ""
            }
        });

        const options = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'http://18.117.194.197/jobe/index.php/restapi/runs/',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: data
        };          

        const response = await axios(options);

        console.log(response)

        const { data: { stdout } } = response;

        return stdout;
    } catch(error) {
        return JSON.stringify(error);
    }
}

