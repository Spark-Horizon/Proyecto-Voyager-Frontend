import { useState } from 'react';
import { useGetPath } from '../../hooks/useGetPath.js'
import { useGetUnlocked } from '../../hooks/useGetUnlocked.js';
import { Link } from 'react-router-dom'

export const Path = ({ materia_id }) => {
  const { path, temas } = useGetPath(materia_id); // Obtener datos del camino basado en el ID de la materia
  const { unlockedPath } = useGetUnlocked(materia_id); // Obtener datos desbloqueados basados en el ID de la materia

  if (!path || !unlockedPath || !temas) {
    return <div>Cargando...</div>; // Mostrar mensaje de carga si no hay datos disponibles
  }

  // Estilo del subtema segun este disponible o no
  const setStyle = (id_subtem) => {
    // @ALE AQUI ES DONDE SE TIENE QUE BLOQUEAR EL LINK/BOTON
    // Cambiar a atributo.
    return { color: unlockedPath.find(item => item.id_subtema === id_subtem) ? 'green' : 'orange' }
  }

  // Estilo de link segun el nivel haya sido superado o no
  const practice = (id_subtem) => {
    if (unlockedPath.find(item => item.id_subtema === id_subtem && item.superado)) {
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
      tRacha = path.find(item => item.id === id_subtem).racha_om
      tRequeridos = path.find(item => item.id === id_subtem).requeridos_om
      uRacha = unlockedPath.find(item => item.id_subtema === id_subtem)?.user_racha_om || 0
      uRequeridos = unlockedPath.find(item => item.id_subtema === id_subtem)?.user_progreso_om || 0
      moGoals = (!unlockedPath.find(item => item.id_subtema === id_subtem)?.superado && (tRacha === uRacha || tRequeridos === uRequeridos))

    } else if (type === "c") {
      tRacha = path.find(item => item.id === id_subtem).racha_codigo
      tRequeridos = path.find(item => item.id === id_subtem).requeridos_codigo
      uRacha = unlockedPath.find(item => item.id_subtema === id_subtem)?.user_racha_codigo || 0
      uRequeridos = unlockedPath.find(item => item.id_subtema === id_subtem)?.user_progreso_codigo || 0
      cGoals = (!unlockedPath.find(item => item.id_subtema === id_subtem)?.superado && (tRacha === uRacha || tRequeridos === uRequeridos))
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
            to={{ pathname: '/MOPage' }}
            state={{subtem: subtem.id}}
            /*Rojo = Link deshabilitado
            * Azul = Link habilitado
            */
            style={{color: moGoals ? 'red' : 'blue'}}>
            Opción Múltiple</Link>
          <br />
          {goals(subtem.id, "c")}
          <br />
          <Link
            to={{ pathname: '/Compiler' }}
            state={{subtem: subtem.id}}
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