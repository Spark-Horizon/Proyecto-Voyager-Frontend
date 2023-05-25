import { useGetPath, useGetUnlocked } from '../../hooks/useGetPath.js'
import { Link } from 'react-router-dom'

export const Path = ({ materia_id }) => {
  const { data } = useGetPath(materia_id)
  const { uData } = useGetUnlocked(materia_id)

  if (!data || !uData) {
    return <div>Cargando...</div>
  }

  // Guardar en memoria de sesion el subtema seleccionado.
  const StoreSubtem = (subtem_id) => {
    sessionStorage.setItem("curr_subtem", subtem_id)
    sessionStorage.removeItem("curr_ejerci")
    console.log("Stored Curr Subt", subtem_id)
    console.log("Cleared Curr Ejer")
  };

  // Guardar en memoria de sesion un ejercicio dado.
  const SendExercs = (ejercicio_id) => {
    sessionStorage.setItem("curr_ejerci", ejercicio_id);
    sessionStorage.removeItem("curr_subtem");
    console.log("Stored Curr Ejer", ejercicio_id);
    console.log("Cleared Curr Subt");
  };

  // Estructura de Temas con lista de subtemas.
  const temas = {};
  data.forEach((subtem) => {
    const tema_id = subtem.id_tema;
    if (!temas[tema_id]) {
      temas[tema_id] = {
        nombre: subtem.tema_nombre,
        subtemas: [],
      }
    }
    temas[tema_id].subtemas.push(subtem);
  });

  // Estilo del subtema segun este disponible o no
  console.log(uData)
  const setColor = (id_subtem, nombre_subtem) => {
    return <span style={{color: uData.find(item => item.id_subtema === id_subtem) ? 'green' : 'orange'}}>{nombre_subtem}</span>
  }

  // Formateo general del contenido
  const formattedTopics = Object.entries(temas).map(([tema_id, { nombre, subtemas }]) => (
    <div key={tema_id}>
      <h3>{nombre}</h3>
      <h3>{subtemas.nombre}</h3>
      {subtemas.map((subtem) => (
        <div key={subtem.id}>
          {setColor(subtem.id, subtem.nombre)}
          <br />
          <Link
            onClick={() => StoreSubtem(subtem.id)}
            //onClick={() => SendExercs("TC1028_21_OM_10")}
            to={{ pathname: '/MOPage' }}>
            Opción Múltiple</Link>
          <br />
          <Link
            onClick={() => StoreSubtem(subtem.id)}
            //onClick={() => SendExercs("TC1028_21_C_10")}
            to={{ pathname: '/Compiler'}}>
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