import { CustomButton } from '../CustomButton'
import { useState } from "react";
import { Loading } from '../Loading';

import '../../styles/ide/codeInstructions.css';
import '../../styles/moPage.css'

export const MultipleOptionPage = ({ data, submitFunc, handleNextQuestion, id_respuesta }) => {
    const [selectedOption, setSelectedOption] = useState(""); //Opcion seleccionada
    const [selectedIndex, setSelectedIndex] = useState(null); //Indice de la opción seleccionada

    // Funcion para el boton de submit
    const handleSubmit = () => {
        if (selectedIndex === data.answer) {
            console.log("CLICKED");
            handleNextQuestion();
            if(id_respuesta){
                submitFunc(id_respuesta,{ respuesta: selectedOption, correcto: true })
                alert(data.options[selectedIndex].explanation) //CAMBIAR ESTA PARTE POR HINT
            }else{
                submitFunc({ respuesta: selectedOption, correcto: true })
                alert(data.options[selectedIndex].explanation) //CAMBIAR ESTA PARTE POR HINT
            }
        } else if (selectedOption === "") {
            alert("Por favor selecciona una respuesta.")
        } else {
            console.log("CLICKED");
            handleNextQuestion();
            if(id_respuesta){
                submitFunc(id_respuesta, { respuesta: selectedOption, correcto: false })
                alert(data.options[selectedIndex].explanation) //CAMBIAR ESTA PARTE POR HINT 
            }else{
                submitFunc({ respuesta: selectedOption, correcto: false })
                alert(data.options[selectedIndex].explanation) //CAMBIAR ESTA PARTE POR HINT
            }
        }
    }

    if (!data) {
        return <div className="container-cc vh-100 loading-container"><Loading /></div>;
    }

    const difficultyClass = 'code-instructions-difficulty badge ' + data.difficulty;

    const formattedOptions = data.options.map((option, index) => (
        <div key={option.id} className="container-cl mb-3">
            <input className="radio" type="radio" id={option.text} name="opciones" value={option.text} checked={selectedOption === option.text} onChange={() => {setSelectedOption(option.text); setSelectedIndex(index)}} />
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
                        <CustomButton type='btn' text={'Submit'} func={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};
