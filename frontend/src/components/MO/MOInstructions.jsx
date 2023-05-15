import { useState } from "react";
import { useGetMOTask } from "../../hooks/useGetTask";
//Seria crear un nuevo styles para esto supongo
import '../../styles/codeInstructions.css';

export const MOInstructions = ({ problem_id }) => {
    const {data} = useGetMOTask(problem_id);
    const [selectedOption, setSelectedOption] = useState("");
    
    if(!data) {
        return <div>Cargando...</div>
    }

    const { author, title, description, topic, difficulty, answer, hint, options } = data;
    const formattedOptions = options.map((option) => (
        <div key = {option.id}>
            <input type="radio" id={option.text} name="opciones" value={option.text} checked={selectedOption === option.text} onChange={() => setSelectedOption(option.text)} />
            <label htmlFor={option.text}>{option.text}</label>
        </div>
    ))

    const handleSubmit = () => {
        console.log("Opción seleccionada: ", selectedOption);
        if(selectedOption === options[answer].text){
            console.log("Respuesta correcta.");
        }else if(selectedOption === ""){
            console.log("Sin respuesta.");
        }else{
            console.log("Respuesta incorrecta.");
        }
    };

    return(
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