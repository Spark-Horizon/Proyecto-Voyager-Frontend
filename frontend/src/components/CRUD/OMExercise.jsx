import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../CustomButton';
import {useGetFilSubtemaTask, useGetFilDificultadTask} from '../../hooks/useGetCRUDTask.js';

import '../../styles/fonts.css';
import '../../styles/buttons.css';
import { getCreateOMExercise } from '../../helpers/getCRUDTask';

export const OMExercise = (props) => {
  // Estados del componente
  const [subtemaOptions, setSubtemaOptions] = useState([props.subtema]);
  const [authorOption, setAuthorOption] = useState([props.author]);
  const [titleOption, setTitleOption] = useState([props.title]);
  const [descriptionOption, setDescriptionOption] = useState([props.description]);
  const [difficultyOption, setDifficultyOption] = useState([props.difficulty]);
  const [answerOption, setAnswerOption] = useState([props.answer]);
  const [hintsOption, setHintsOption] = useState([props.hints]);

  const { data_subtema } = useGetFilSubtemaTask();
  const { data_dificultad } = useGetFilDificultadTask();

  const navigate = useNavigate()

  const [step, setStep] = useState(1);
  const [exerciseBlocksOM, setExerciseBlocksOM] = useState([{ texto: '', output: '' }]);

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleAddBlockOM = () => {
    setExerciseBlocksOM([...exerciseBlocksOM, { input: '', output: '' }]);
  };

  const handleInputChangeOM = (event, index) => {
    const { value } = event.target;
    const blocks = [...exerciseBlocksOM];
    blocks[index].input = value;
    setExerciseBlocksOM(blocks);
  };

  const handleOutputChangeOM = (event, index) => {
    const { value } = event.target;
    const blocks = [...exerciseBlocksOM];
    blocks[index].output = value;
    setExerciseBlocksOM(blocks);
  };

  const handleCreation = (subtema, author, title, description, difficulty, answer, hints, options) => (e) => {
    e.preventDefault();
    getCreateOMExercise(true, 'Opción múltiple', subtema, author, title, description, difficulty, answer, hints, options);
    navigate('/CRUD');
  }

  if (!data_subtema || !data_dificultad) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
        <div className="text-center mb-5">
            <h3 className="mb-0">Ejercicio de código</h3>
            <span>Ingresa los detalles del ejercicio</span>
        </div>

        <div className="form-group mb-4">
            <label htmlFor="autor" className="text-center">Autor</label>
            <input 
                type="text" 
                id="autor" 
                value={authorOption} 
                onChange={(e) => setAuthorOption(e.target.value)}
                className="form-control" 
                placeholder="Autor del ejercicio" 
                required 
            />
        </div>
    
        <div className="form-group mb-4">
            <label htmlFor="titulo" className="text-center">Título</label>
            <input 
                type="text" 
                id="titulo" 
                value={titleOption} 
                onChange={(e) => setTitleOption(e.target.value)}
                className="form-control" 
                placeholder="Título del ejercicio" 
                required 
            />
        </div>
    
        <div className="form-group mb-4">
            <label htmlFor="descripcion" className="text-center">Descripción</label>
            <textarea 
                id="descripcion" 
                value={descriptionOption} 
                onChange={(e) => setDescriptionOption(e.target.value)}
                className="form-control" 
                placeholder="Descripción del ejercicio" 
                rows={5} 
                required 
            />
        </div>
    
        <div className="form-group mb-4">
            <label htmlFor="subtema" className="text-center">Tema</label>
            <select 
                className="form-select form-select-sm"
                aria-label="Filtro" 
                required 
                id="subtema" 
                value={subtemaOptions}
                onChange={(e) => setSubtemaOptions(e.target.value)}>
                <option value={props.tema}></option>
                {data_subtema.map((row) => (
                  <option key={row.id_subtema} value={row.id_subtema+","+row.nombre}>
                    {row.nombre}
                  </option>
                ))}      
                <option value=""></option>
            </select>
        </div>
    
        <div className="form-group mb-4">
            <label htmlFor="dificultad" className="text-center">Dificultad</label>
            <select 
                className="form-select form-select-sm"
                aria-label="Filtro" 
                required 
                id="dificultad" 
                value={difficultyOption}
                onChange={(e) => setDifficultyOption(e.target.value)}>
                  <option value={props.dificultad}></option>
                {data_dificultad.map((row) => (
                  <option key={row['?column?']} value={row['?column?']}>
                    {row['?column?']}
                  </option>
                ))}
                <option value=""></option>
            </select>
        </div>
    
        <div className="form-group mb-4">
            <label htmlFor="respuesta" className="text-center">Respuesta</label>
            <input 
                type="text" 
                id="respuesta" 
                value={answerOption} 
                onChange={(e) => setAnswerOption(e.target.value)}
                className="form-control" 
                placeholder="" 
                required 
            />
        </div>

        <div className="form-group mb-4">
            <label htmlFor="pistas" className="text-center">Pistas</label>
            <select 
                id="pistas" 
                value={hintsOption} 
                onChange={(e) => setHintsOption(e.target.value)}
                className="form-select form-select-sm"
                aria-label="Filtro" 
                required 
            >
                <option value=""></option>
            </select>
        </div>
    
        <h5 className="mb-2">Opciones</h5>
        {exerciseBlocksOM.map((block, index) => (
          <div key={index} className="form-group mb-4">
            <label htmlFor={`input-${index}`} className="text-center">Texto</label>
            <textarea 
              id={`texto-${index}`} 
              value={block.input} 
              onChange={(event) => handleInputChangeOM(event, index)} 
              className="form-control" 
              placeholder="Texto del ejercicio" 
              rows={5} 
              required 
            />
            <label htmlFor={`output-${index}`} className="text-center">Explicación</label>
            <textarea 
              id={`explicacion-${index}`} 
              value={block.output} 
              onChange={(event) => handleOutputChangeOM(event, index)} 
              className="form-control" 
              placeholder="Explicacion del ejercicio" 
              rows={5} 
              required 
            />
          </div>
        ))}
        <button type="button" onClick={handleAddBlockOM} className="btn btn-primary">Añadir</button>
    
        <div className="select next-back mt-5">
        <CustomButton
            type={'btn btnSecondary'}
            text={'Atrás'}
            func={handlePrevStep}
        />
        <CustomButton
            type={'btn btn-success'}
            text={'Crear ejercicio'}
            func={handleCreation(subtemaOptions, authorOption, titleOption, descriptionOption, difficultyOption, answerOption, hintsOption, exerciseBlocksOM)}
        />
        </div>
    </div>
  )
}