import { useEffect, useState } from 'react';
import { CustomButton } from '../CustomButton';
import {useGetFilSubtemaTask, useGetFilDificultadTask} from '../../hooks/useGetCRUDTask.js';
import {useGetNameTask} from '../../hooks/useGetTeacherTask';

import '../../styles/fonts.css';
import '../../styles/buttons.css';
import { getUpdateOMExercise, getCreateOMExercise } from '../../helpers/getCRUDTask';

export const OMExercise = (props) => {
  const [subtemaOptions, setSubtemaOptions] = useState(props.subtema || '');
  const [authorOption, setAuthorOption] = useState(props.author || '');
  const [titleOption, setTitleOption] = useState(props.title || '');
  const [descriptionOption, setDescriptionOption] = useState(props.description || '');
  const [difficultyOption, setDifficultyOption] = useState(props.difficulty || '');
  const [answerOption, setAnswerOption] = useState(props.answer || '0');
  const [hintsOption, setHintsOption] = useState(props.hints || false);
  const [aprobadoOption, setAprobadoOption] = useState(props.rol === 'Administrador' ? (props.aprobado || false) : false );
  const [readOnly, setReadOnly] = useState(false);
  const [editable, setEditable] = useState(false);
  const { data_subtema } = useGetFilSubtemaTask();
  const { data_dificultad } = useGetFilDificultadTask();
  const { data_name } = useGetNameTask(props.idDocente);

  const [exerciseBlocksOM, setExerciseBlocksOM] = useState(props.options || [{ text: '', explanation: '' }]);

  useEffect(() => {
    if (data_name && !authorOption){
      setAuthorOption(data_name['nombre']+" "+data_name['apellido1']+" "+data_name['apellido2']);
    }
  }, [data_name]);

  useEffect(() => {
    if (props.idDocente !== props.id_autor && props.rol === 'Docente' && props.idDocente) {
      setReadOnly(true);
      setEditable(false);
    } else {
      setReadOnly(false);
      setEditable(true);
    }
  }, [props.idDocente, props.id_autor, props.rol]);
  
  const handlePrevious = () => {
    props.onStep();
  }

  const handleAddBlockOM = () => {
    setExerciseBlocksOM([...exerciseBlocksOM, { text: '', explanation: '' }]);
  };

  const handleRemoveBlockOM = () => {
    if (exerciseBlocksOM.length === 1) {
      setExerciseBlocksOM([{ text: '', explanation: '' }]);
    } else {
      const blocks = [...exerciseBlocksOM];
      blocks.pop();
      setExerciseBlocksOM(blocks);
    }
  };

  const handleAnswerChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      setAnswerOption(value);
    }
  };

  const handleInputChangeOM = (event, index) => {
    const { value } = event.target;
    const blocks = [...exerciseBlocksOM];
    blocks[index].text = value;
    setExerciseBlocksOM(blocks);
  };

  const handleOutputChangeOM = (event, index) => {
    const { value } = event.target;
    const blocks = [...exerciseBlocksOM];
    blocks[index].explanation = value;
    setExerciseBlocksOM(blocks);
  };

  const handleCreation = (aprobado, subtema, author, title, description, difficulty, answer, hints, options, id_autor) => (e) => {
    e.preventDefault();
    getCreateOMExercise(aprobado, 'Opción múltiple', subtema, author, title, description, difficulty, answer, hints, options, id_autor);
    props.onStep();
  }

  const handleEdition = (id, aprobado, subtema, author, title, description, difficulty, answer, hints, options) => (e) => {
    e.preventDefault();
    getUpdateOMExercise(id, aprobado, 'Opción múltiple', subtema, author, title, description, difficulty, answer, hints, options);
    props.onStep();
  }

  const handleAddition = (id, titulo, tipo, id_subtema) => (e) => {
    const addExercise = {"id": id, 
                         "?column?": titulo,
                         "tipo": tipo,
                         "id_subtema": id_subtema.split(',')[0]};
    props.onAddExercise(addExercise);
  }

  if (!data_subtema || !data_dificultad) {
    return <div>Cargando...</div>;
  }

  console.log(props.idDocente, props.id_autor, props.rol);

  return (
    <div>
        <div className="text-center mb-5">
            <h3 className="mb-0">Ejercicio de opción múltiple</h3>
            <span>Ingresa los detalles del ejercicio</span>
        </div>

        <div className="form-group mb-4">
            <label htmlFor="autor" className="text-center">Autor</label>
            {(props.rol === 'Docente') && (
              <input 
                  type="text" 
                  id="autor" 
                  value={authorOption} 
                  onChange={(e) => setAuthorOption(e.target.value)}
                  className="form-control" 
                  placeholder="Autor del ejercicio" 
                  required
                  readOnly
              />
            )}
            {(props.rol === 'Administrador') && (
              <input 
                  type="text" 
                  id="autor" 
                  value={authorOption} 
                  onChange={(e) => setAuthorOption(e.target.value)}
                  className="form-control" 
                  placeholder="Autor del ejercicio" 
                  required
              />
            )}
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
                readOnly={readOnly}
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
                readOnly={readOnly}
            />
        </div>
    
        <div className="form-group mb-4">
            <label htmlFor="subtema" className="text-center">Tema</label>
            <select 
                className="form-select form-select-sm"
                aria-label="Filtro" 
                required 
                disabled={!editable}
                id="subtema" 
                value={subtemaOptions}
                onChange={(e) => setSubtemaOptions(e.target.value)}>
                <option value={props.subtema}></option>
                {data_subtema.map((row) => (
                  <option key={row.id_subtema} value={row.id_subtema+","+row.nombre}>
                    {row.nombre}
                  </option>
                ))}      
            </select>
        </div>

        <div className="form-group mb-4">
            <label htmlFor="dificultad" className="text-center">Dificultad</label>
            <select 
                className="form-select form-select-sm"
                aria-label="Filtro" 
                required 
                disabled={!editable}
                id="dificultad" 
                value={difficultyOption}
                onChange={(e) => setDifficultyOption(e.target.value)}>
                <option value={props.dificultad}></option>
                {data_dificultad.map((row) => (
                  <option key={row['?column?']} value={row['?column?']}>
                    {row['?column?']}
                  </option>
                ))}
            </select>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="respuesta" className="text-center">Respuesta</label>
          <input 
            type="text" 
            id="respuesta" 
            value={answerOption} 
            onChange={handleAnswerChange}
            className="form-control" 
            placeholder="" 
            required 
            readOnly={readOnly}
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="pistas" className="text-center">Pistas</label>
          <div className="form-check">
            <input
              type="checkbox"
              id="pistas"
              checked={hintsOption}
              onChange={(e) => setHintsOption(e.target.checked)}
              className="form-check-input"
              required
              readOnly={readOnly}
            />
            <label className="form-check-label" htmlFor="pistas">
              Mostrar pistas
            </label>
          </div>
        </div>

        {(props.rol === 'Administrador') && (
          <div className="form-group mb-4">
            <label htmlFor="aprobado" className="text-center">Aprobado</label>
            <div className="form-check">
              <input
                type="checkbox"
                id="aprobado"
                checked={aprobadoOption}
                onChange={(e) => setAprobadoOption(e.target.checked)}
                className="form-check-input"
                required        
              />
              <label className="form-check-label" htmlFor="aprobado">
                Marcar como aprobado
              </label>
            </div>
          </div>
        )}
    
        <h5 className="mb-2">Opciones</h5>
        {exerciseBlocksOM.map((block, index) => (
          <div key={index} className="form-group mb-4">
            <label htmlFor={`input-${index}`} className="text-center">Texto</label>
            <textarea 
              id={`texto-${index}`} 
              value={block.text} 
              onChange={(event) => handleInputChangeOM(event, index)} 
              className="form-control" 
              placeholder="Texto del ejercicio" 
              rows={5} 
              required 
              readOnly={readOnly}
            />
            <label htmlFor={`output-${index}`} className="text-center">Explicación</label>
            <textarea 
              id={`explicacion-${index}`} 
              value={block.explanation} 
              onChange={(event) => handleOutputChangeOM(event, index)} 
              className="form-control" 
              placeholder="Explicacion del ejercicio" 
              rows={5} 
              required 
              readOnly={readOnly}
            />
          </div>
        ))}

        {(props.idDocente === props.id_autor || props.rol === 'Administrador') && (
          <div className="d-flex justify-content-between">
            <button
              type="button"
              onClick={handleAddBlockOM}
              className="btn btn-primary"
            >
              Añadir
            </button>
            {exerciseBlocksOM.length > 1 && (
              <button
                type="button"
                onClick={handleRemoveBlockOM}
                className="btn btn-primary btn-danger"
              >
                Quitar
              </button>
            )}
          </div>
        )}
    
        <div className="select next-back mt-5">
          <CustomButton
              type={'btn btnSecondary'}
              text={'Atrás'}
              func={handlePrevious}
          />

          { props.edicion && props.rol === 'Docente' && props.onCheckDup(props.id) && (
            <CustomButton
              type={'btn btn-success'}
              text={'Agregar ejercicio'}
              func={handleAddition(
                props.id,
                titleOption,
                'Opción múltiple',
                subtemaOptions
              )}
              disabled={
                !titleOption.trim() ||
                !authorOption.trim() ||
                !descriptionOption.trim() ||
                !subtemaOptions ||
                !difficultyOption ||
                !answerOption ||
                exerciseBlocksOM.some((block) => !block.text || !block.explanation)
              }
            />
          )}

          {props.edicion && (props.idDocente === props.id_autor || props.rol === 'Administrador') && (
            <CustomButton
                type={'btn btn-success'}
                text={'Editar ejercicio'}
                func={handleEdition(props.id, aprobadoOption, subtemaOptions, authorOption, titleOption, descriptionOption, difficultyOption, answerOption, hintsOption, JSON.stringify(exerciseBlocksOM))}
                disabled={
                  !titleOption.trim() ||
                  !authorOption.trim() ||
                  !descriptionOption.trim() ||
                  !subtemaOptions ||
                  !difficultyOption ||
                  !answerOption ||
                  exerciseBlocksOM.some(block => !block.text || !block.explanation)
                }
            />
          )}

          {!props.edicion && (
            <CustomButton
                type={'btn btn-success'}
                text={'Crear ejercicio'}
                func={handleCreation(aprobadoOption, subtemaOptions, authorOption, titleOption, descriptionOption, difficultyOption, answerOption, hintsOption, JSON.stringify(exerciseBlocksOM), (props.idDocente || null))}
                disabled={
                  !titleOption.trim() ||
                  !authorOption.trim() ||
                  !descriptionOption.trim() ||
                  !subtemaOptions ||
                  !difficultyOption ||
                  !answerOption ||
                  exerciseBlocksOM.some(block => !block.text || !block.explanation)
                }
            />
          )}
        </div>
    </div>
  )
}