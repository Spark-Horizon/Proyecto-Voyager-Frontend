import { useGetPath } from '../../hooks/useGetPath.js';
import { Link } from 'react-router-dom';

export const Path = ({ materia_id }) => {
  const { data } = useGetPath(materia_id);

  if (!data) {
    return <div>Cargando...</div>;
  }

  const StoreSubtem = (subtem_id) => {
    sessionStorage.setItem("curr_subtem", subtem_id);
    sessionStorage.removeItem("curr_ejerci");
    console.log("Stored Curr Subt", subtem_id);
    console.log("Cleared Curr Ejer");
  };

  const SendExercs = (ejercicio_id) => {
    sessionStorage.setItem("curr_ejerci", ejercicio_id);
    sessionStorage.removeItem("curr_subtem");
    console.log("Stored Curr Ejer", ejercicio_id);
    console.log("Cleared Curr Subt");
  };

  const temas = {};
  data.forEach((subtem) => {
    const tema_id = subtem.id_tema;
    if (!temas[tema_id]) {
      temas[tema_id] = [];
    }
    temas[tema_id].push(subtem);
  });
  const formattedTopics = Object.entries(temas).map(([tema_id, subtemas]) => (
    <div key={tema_id}>
      {/* Nombre del tema */}
      <h3>{subtemas.nombre}</h3>
      {subtemas.map((subtem) => (
        <div key={subtem.id}>
          {/* nombre del subtema */}
          {subtem.nombre}
          <br />
          <Link
            onClick={() => StoreSubtem(subtem.id)}
            //onClick={() => SendExercs("TC1028_21_OM_10")}
            to={{ pathname: '/MOPage' }}
          >
            Opción Múltiple</Link>
          <br />
          <Link to='/Compiler'>
            Código</Link>
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