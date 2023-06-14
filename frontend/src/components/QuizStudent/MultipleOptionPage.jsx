import { CustomButton } from '../CustomButton'
import { useState } from "react";
// import { Loading } from '../Loading';

import '../../styles/ide/codeInstructions.css';
import '../../styles/moPage.css'

export const MultipleOptionPage = ({ data, currentIndex, setCurrentIndex, totalQuestions, submitFunc, handleFinish }) => {
    console.log("INFO MOPAGE DATA:", data);
    const [selectedOption, setSelectedOption] = useState(""); //Opcion seleccionada
    const [showNextButton, setShowNextButton] = useState(false);

    console.log(data);

    // Funcion para el boton de submit
    const handleSubmit = () => {
        if (selectedOption === data.options[data.answer].text) {
            submitFunc({ respuesta: selectedOption, correcto: true })
            alert("Respuesta correcta.")
            setShowNextButton(true)
        } else if (selectedOption === "") {
            alert("Por favor selecciona una respuesta.")
        } else {
            submitFunc({ respuesta: selectedOption, correcto: false })
            alert("Respuesta incorrecta.")
            setShowNextButton(true)
        }
    }

    // Añade esta función para manejar el paso a la siguiente pregunta
    const handleNextQuestion = () => {
        if (currentIndex < totalQuestions - 1) { // Ahora usamos totalQuestions
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(""); // Resetea la opción seleccionada
            setShowNextButton(false); // Oculta el botón siguiente
        } else {
            handleFinish(); // Si es la última pregunta, termina el cuestionario
        }
    }

    if (!data) {
        //return <div className="container-cc vh-100 loading-container"><Loading/></div>;
        return <div>Cargando...</div>
    }

    const difficultyClass = 'code-instructions-difficulty badge ' + data.difficulty;

    const formattedOptions = data.options.map((option) => (
        <div key={option.id} className="container-cl mb-3">
            <input className="radio" type="radio" id={option.text} name="opciones" value={option.text} checked={selectedOption === option.text} onChange={() => setSelectedOption(option.text)} />
            <label htmlFor={option.text}>{option.text}</label>
        </div>
    ))

    return (
        <div className="mopage-main-container container-cc">
            <div className="mo-instructions">
                <p className="code-instructions-topic">{data.topic}</p>
                <div className="mo-instructions-content">
                    <div className="mo-instructions-info">
                        <div className="code-instructions-title">
                            <h3>{data.title}</h3>
                            {/* <span className={difficultyClass}>{data.difficulty}</span> */}
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
                            <CustomButton type='btn' text={'Siguiente'} func={handleNextQuestion} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
