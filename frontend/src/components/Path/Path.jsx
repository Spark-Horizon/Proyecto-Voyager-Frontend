import { useGetPath, useGetUnlocked } from '../../hooks/useGetPath.js'
import { Link } from 'react-router-dom'

export const Path = ({ materia_id }) => {
  const { data } = useGetPath(materia_id); // Obtener datos del camino basado en el ID de la materia
  const { uData } = useGetUnlocked(materia_id); // Obtener datos desbloqueados basados en el ID de la materia

  if (!data || !uData) {
    return <div>Cargando...</div>; // Mostrar mensaje de carga si no hay datos disponibles
  }

  // Guardar en memoria de sesion el subtema seleccionado.
  const StoreSubtem = (subtem_id) => {
    sessionStorage.setItem("curr_subtem", subtem_id)
    sessionStorage.removeItem("curr_ejerci")
    console.log("Stored Curr Subt", subtem_id)
    console.log("Cleared Curr Ejer")
  };

  // Guardar en memoria de sesion un ejercicio dado.
  /*const SendExercs = (ejercicio_id) => {
    sessionStorage.setItem("curr_ejerci", ejercicio_id);
    sessionStorage.removeItem("curr_subtem");
    console.log("Stored Curr Ejer", ejercicio_id);
    console.log("Cleared Curr Subt");
  };*/

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
  const setStyle = (id_subtem) => {
    // @ALE AQUI ES DONDE SE TIENE QUE BLOQUEAR EL LINK/BOTON
    // Cambiar a atributo.
    return { color: uData.find(item => item.id_subtema === id_subtem) ? 'green' : 'orange' }
  }

  // Estilo de link segun el nivel haya sido superado o no
  const practice = (id_subtem) => {
    if (uData.find(item => item.id_subtema === id_subtem && item.superado)) {
      return <span>MODO PRACTICA:<br /></span>
    }
  }

  // Mostrar racha (user/tema) y requeridos (user/tema)
  var moGoals;
  var cGoals;
  const goals = (id_subtem, type) => {
    var tRacha
    var tRequeridos
    var uRacha
    var uRequeridos

    if (type === "mo") {
      tRacha = data.find(item => item.id === id_subtem).racha_om
      tRequeridos = data.find(item => item.id === id_subtem).requeridos_om
      uRacha = uData.find(item => item.id_subtema === id_subtem)?.user_racha_om || 0
      uRequeridos = uData.find(item => item.id_subtema === id_subtem)?.user_progreso_om || 0
      moGoals = (!uData.find(item => item.id_subtema === id_subtem)?.superado && (tRacha === uRacha || tRequeridos === uRequeridos))

    } else if (type === "c") {
      tRacha = data.find(item => item.id === id_subtem).racha_codigo
      tRequeridos = data.find(item => item.id === id_subtem).requeridos_codigo
      uRacha = uData.find(item => item.id_subtema === id_subtem)?.user_racha_codigo || 0
      uRequeridos = uData.find(item => item.id_subtema === id_subtem)?.user_progreso_codigo || 0
      cGoals = (!uData.find(item => item.id_subtema === id_subtem)?.superado && (tRacha === uRacha || tRequeridos === uRequeridos))
    }

    return (
      <span>
        Racha: {uRacha}/{tRacha}
        <br />
        Requeridos: {uRequeridos}/{tRequeridos}
      </span>
    )
  }

  // Formateo general del contenido
  const formattedTopics = Object.entries(temas).map(([tema_id, { nombre, subtemas }]) => (
    <div key={tema_id}>
      <h3>{nombre}</h3>
      {subtemas.map((subtem) => (
        <div key={subtem.id}>
          {/*SETSTYLE PUEDE QUE TENGA QUE ESTAR EN UN DIV PARA BLOQUEAR TODA LA TARJETA/COMPONENTE
          DEL TEMA*/}
          <span style={setStyle(subtem.id)}>{subtem.nombre}</span>
          <br />
          {practice(subtem.id)}
          {goals(subtem.id, "mo")}
          <br />
          <Link
            onClick={() => StoreSubtem(subtem.id)}
            //onClick={() => SendExercs("TC1028_21_OM_10")}
            to={{ pathname: '/MOPage' }}
            /*Rojo = Link deshabilitado
            * Azul = Link habilitado
            */
            style={{color: moGoals ? 'red' : 'blue'}}>
            Opción Múltiple</Link>
          <br />
          {goals(subtem.id, "c")}
          <br />
          <Link
            onClick={() => StoreSubtem(subtem.id)}
            //onClick={() => SendExercs("TC1028_21_C_10")}
            to={{ pathname: '/Compiler' }}
            style={{color: cGoals ? 'red' : 'blue'}}>
            Código</Link>
        </div>
      ))}
    </div>
  ));

  return (
    <div>
      {formattedTopics}
    </div>
  )
}