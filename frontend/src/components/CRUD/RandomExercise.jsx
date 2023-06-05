import { useEffect, useState } from 'react';
import { CustomButton } from '../CustomButton';

import '../../styles/fonts.css';
import '../../styles/buttons.css';
import { useGetCreateAddRandomExercise, useGetFilSubtemaTask, useGetFilTipoTask, useGetFilDificultadTask } from '../../hooks/useGetCRUDTask.js';

export const RandomExercise = (props) => {
  const [subtemaOption, setSubtemaOption] = useState('');
  const { data_subtema } = useGetFilSubtemaTask();
  const [tipoOption, setTipoOption] = useState('');
  const { data_tipo } = useGetFilTipoTask();
  const [difficultyOption, setDifficultyOption] = useState('');
  const { data_dificultad } = useGetFilDificultadTask();
  const [idExercise, setIdExercise] = useState('');
  const { data_random } = useGetCreateAddRandomExercise(tipoOption, subtemaOption, difficultyOption);

  const handlePrevious = () => {
    props.onStep();
  }

  useEffect(() => {
    setIdExercise(data_random);
  }, [data_random]);

  const handleCreation = (tipo, subtema, difficulty, id_exercise) => (e) => {
    e.preventDefault();
    console.log(id_exercise['agregarincluirejercicio']);
    console.log("aqui 1");
    props.onExerciseAdd();
    const addExercise = {"id": id_exercise['agregarincluirejercicio'], 
                         "?column?": "Ejercicio aleatorio "+difficulty,
                         "tipo": tipo,
                         "id_subtema": subtema.split(',')[0]};
    props.onAddExercise(addExercise);
  }

  if (!data_subtema || !data_dificultad || !data_tipo) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
        <section id="exerciseChoosingForm" className="container-cc">
          <form>
            <div>
                <div className="text-center mb-4">
                    <h3 className="mb-0">Elección de ejercicio</h3>
                    <span>Selecciona los rubros que debe cumplir el ejercicio</span>
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="tipo" className="text-center">Tipo</label>
                    <select 
                        className="form-select form-select-sm"
                        aria-label="Filtro" 
                        required 
                        id="tipo" 
                        value={tipoOption}
                        onChange={(e) => setTipoOption(e.target.value)}>
                        <option value="">Tipo</option>
                        {data_tipo.map((row) => (
                          <option key={row.tipo} value={row.tipo}>
                            {row.tipo}
                          </option>
                        ))}
                    </select>
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="subtema" className="text-center">Tema</label>
                  <select 
                    className="form-select form-select-sm"
                    aria-label="Filtro" 
                    required 
                    id="subtema" 
                    value={subtemaOption}
                    onChange={(e) => setSubtemaOption(e.target.value)}>
                    <option value="">Subtema </option>
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
                    id="dificultad" 
                    value={difficultyOption}
                    onChange={(e) => setDifficultyOption(e.target.value)}>
                    <option value="">Dificultad </option>
                    {data_dificultad.map((row) => (
                      <option key={row['?column?']} value={row['?column?']}>
                        {row['?column?']}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="select next-back mt-5">
                  <CustomButton
                    type="btn mt-3 btnPrimary"
                    text="Atrás"
                    func={handlePrevious}
                  />
                  <CustomButton 
                    type='btn mt-3 btn-success'
                    text='Guardar ejercicio'
                    func={handleCreation(tipoOption, subtemaOption, difficultyOption, idExercise)}
                    disabled={
                        !tipoOption ||
                        !subtemaOption ||
                        !difficultyOption
                    }
                  />
                </div>
            </div>
          </form>
        </section>
    </div>
  )
}