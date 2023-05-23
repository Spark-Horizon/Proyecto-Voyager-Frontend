import { useEffect, useState } from "react";
import { useGetTask } from "../../hooks/useGetTask";
import { useGetProgress } from "../../hooks/useGetProgress";
import '../../styles/codeInstructions.css';

export const MOInstructions = () => {
    const [problem_id, setProblemID] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const subtem_id = sessionStorage.getItem("curr_subtem");
    const ejercicio_id = sessionStorage.getItem("curr_ejerci");
    const { data_progress, _ } = useGetProgress(subtem_id);

    useEffect(() => {
        let problemId = "";
        if (ejercicio_id != null) {
            problemId = ejercicio_id;
        } else if (data_progress != null) {
            problemId = data_progress.id_ejercicio;
        }
        setProblemID(problemId);
    }, [data_progress, ejercicio_id]);

    
    const { data } = useGetTask(problem_id);

    if (!data) {
        return <div>Cargando...</div>;
    }

    const { title, description, topic, difficulty, answer, options } = data;
    const formattedOptions = options.map((option, index) => (
        <div key={index}>
            <input type="radio" id={option.text} name="opciones" value={option.text} checked={selectedOption === option.text} onChange={() => setSelectedOption(option.text)} />
            <label htmlFor={option.text}>{option.text}</label>
        </div>
    ));
    

    const handleSubmit = () => {
        console.log("OpciÃ³n seleccionada: ", selectedOption);
        if (selectedOption === options[answer].text) {
            console.log("Respuesta correcta.");
        } else if (selectedOption === "") {
            console.log("Sin respuesta.");
        } else {
            console.log("Respuesta incorrecta.");
        }
    };

    return (
        <div className="mo-instructions">
            <div className="mo-instructions-info">
                <p className="code-instructions-topic">Tema: {topic}</p>
                <p className="code-instructions-difficulty">Dificultad: {difficulty}</p>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="mo-instructions-options">
                <fieldset className="options-field">
                    <legend>Selecciona la respuesta correcta:</legend>
                    <div>{formattedOptions}</div>
                    <div>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </fieldset>
            </div>
        </div>
    );
};
