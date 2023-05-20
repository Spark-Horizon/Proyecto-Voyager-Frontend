import { useGetPath } from '../../hooks/useGetPath.js';
import { Link } from 'react-router-dom';

export const Path = ({ materia_id }) => {
  const { data } = useGetPath(materia_id);

  if (!data) {
    return <div>Cargando...</div>;
  }

  const temas = {};
  data.forEach((subtem) => {
    const tema_id = subtem.id_tema;
    if(!temas[tema_id]){
      temas[tema_id] = {
        nombre: subtem.tema_nombre,
        subtemas: []
      };
    }
    temas[tema_id].subtemas.push({ id: subtem.id, nombre: subtem.nombre });
  });

  const formattedTopics = Object.values(temas).map((tema) => (
    <div key={tema.id}>
      {/* Nombre del tema */}
      <h3>{tema.nombre}</h3> 
      {tema.subtemas.map((subtem) => (
        <div key={subtem.id}>
          {/* nombre del subtema */}
          {subtem.nombre}
          <br />
          <Link to={{
              pathname: '/MOPage',
              state: { subtem_id: subtem.id}
            }}>Opción Múltiple</Link>
          <br />
          <Link to='/Compiler'>Código</Link>
        </div>
      ))}
    </div>
  ));

  return (
    <div>
      <p> {formattedTopics} </p>
    </div>
  )
}


// alumn_subtem implementation