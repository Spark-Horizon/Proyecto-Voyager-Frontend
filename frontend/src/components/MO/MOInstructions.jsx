import { CustomButton } from '../CustomButton'
import { useState } from "react";
import { useGetTask } from "../../hooks/useGetTask";
import { submitPractica } from '../../helpers/indexHelpers';

import '../../styles/codeInstructions.css';

export const MOInstructions = ({ problem_id, attempt_id, handleNext, available, practiceMode }) => {
    const [selectedOption, setSelectedOption] = useState(""); //Opcion seleccionada
    const [showNextButton, setShowNextButton] = useState(false);

    const { data } = useGetTask(problem_id);

    if (!data) {
        return <div>Cargando...</div>;
    }

    const difficultyClass = 'code-instructions-difficulty badge ' + data.difficulty;

    const formattedOptions = data.options.map((option) => (
        <div key={option.id} className="container-cl mb-3">
            <input className="radio" type="radio" id={option.text} name="opciones" value={option.text} checked={selectedOption === option.text} onChange={() => setSelectedOption(option.text)} />
            <label htmlFor={option.text}>{option.text}</label>
        </div>
    ));

    const handleSubmit = () => {
        console.log("Opción seleccionada: ", selectedOption);
        if (selectedOption === data.options[data.answer].text) {
            if(!practiceMode) submitPractica(attempt_id, { respuesta: selectedOption, correcto: true })
            alert("Respuesta correcta.")
            setShowNextButton(true);
        } else if (selectedOption === "") {
            alert("Por favor selecciona una respuesta.")
        } else {
            if(!practiceMode) submitPractica(attempt_id, { respuesta: selectedOption, correcto: false })
            alert("Respuesta incorrecta.")
            setShowNextButton(true);
        }
    };

    return (
        (!available && !practiceMode) ? (
            <div className="mo-instructions">
                <div className="mo-instructions-content">
                    <div className="mo-instructions-info">
                        <div className="code-instructions-title">
                            <h3>Resuelve la parte de Codigo antes de avanzar.</h3>
                        </div>
                    </div>
                    <div className="mo-instructions-submit container-cc">
                        <CustomButton type='btn' text={'Regresar al Path'} func={handleNext} />
                    </div>
                </div>
            </div>
        ) : (
            <div className="mo-instructions">
                <p className="code-instructions-topic">{data.topic}</p>
                <div className="mo-instructions-content">
                    <div className="mo-instructions-info">
                        <div className="code-instructions-title">
                            <h3>{data.title}</h3>
                            <span className={difficultyClass}>{data.difficulty}</span>
                        </div>
                        <div className="mo-instructions-description mb-4">
                            {data.description}
                        </div>
                    </div>
                    <div className="mo-instructions-options mb-4">
                        <fieldset className="options-field">
                            <p className="fw-bold">Selecciona la respuesta correcta:</p>
                            <div>{formattedOptions}</div>
                        </fieldset>
                    </div>
                    <div className="mo-instructions-submit container-cc">
                        {!showNextButton ? (
                            <CustomButton type='btn' text={'Submit'} func={handleSubmit} />
                        ) : (
                            <CustomButton type='btn' text={'Siguiente'} func={handleNext} />
                        )}
                    </div>
                </div>
            </div>
        )
    );
};
