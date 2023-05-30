import { useState } from "react";
import { CustomButton } from '../../components/CustomButton'
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
    const difficultyClass = 'code-instructions-difficulty badge ' + difficulty;

    const formattedOptions = options.map((option) => (
        <div key={option.id} className="container-cl mb-3">
            <input className="radio" type="radio" id={option.text} name="opciones" value={option.text} checked={selectedOption === option.text} onChange={() => setSelectedOption(option.text)} />
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
            <p className="code-instructions-topic">{topic}</p>
            <div className="mo-instructions-content">
                <div className="mo-instructions-info">
                    <div className="code-instructions-title">
                        <h3>{title}</h3>
                        <span className={difficultyClass}>{difficulty}</span>
                    </div>
                    <div className="mo-instructions-description mb-4">
                        {description}
                    </div>
                </div>
                <div className="mo-instructions-options mb-4">
                    <fieldset className="options-field">
                        <p className="fw-bold">Selecciona la respuesta correcta:</p>
                        <div>{formattedOptions}</div>
                    </fieldset>
                </div>
                <div className="mo-instructions-submit container-cc">
                    <CustomButton type='btn' text={'Submit'} func={handleSubmit}/>
                </div>
            </div>
        </div>
    );
};