import { useGetPath } from '../../hooks/useGetPath.js'
import { useGetUnlocked } from '../../hooks/useGetUnlocked.js';
import { useAvailableType } from '../../hooks/useAvailableType.js';
import { useAuth } from '../../hooks/AuthContext.js';
import { Link } from 'react-router-dom'

export const Path = ({ materia_id }) => {
  const { user } = useAuth();
  const user_id = user.id;
  const { path, temas } = useGetPath(materia_id); // Obtener datos del camino basado en el ID de la materia
  const { unlockedPath } = useGetUnlocked(materia_id, user_id); // Obtener datos desbloqueados basados en el ID de la materia
  const { typeInfo } = useAvailableType(path, unlockedPath);

  if (!path || !unlockedPath || !temas || !typeInfo) {
    return <div>Cargando...</div>; // Mostrar mensaje de carga si no hay datos disponibles
  }

  console.log(typeInfo);

  // Estilo del subtema segun este disponible o no
  const setStyle = (id_subtem) => {
    return { color: unlockedPath.find(item => item.id_subtema === id_subtem) ? 'green' : 'orange' }
  }

  // Estilo de link segun el subtema haya sido superado o no
  const practice = (id_subtem) => {
    return unlockedPath.find(item => item.id_subtema === id_subtem && item.superado)
  }

  // Mostrar racha (user/tema) y requeridos (user/tema)
  const goals = (id_subtem, type) => {
    return (
      <span>
        Racha: {typeInfo[id_subtem][type].uRacha}/{typeInfo[id_subtem][type].racha}
        <br />
        Requeridos: {typeInfo[id_subtem][type].uRequeridos}/{typeInfo[id_subtem][type].requeridos}
      </span>
    )
  }

  // Mostrar si el tipo de ejercicio (mo/c) esta bloqueado o no disponible
  const available = (id_subtem, type) => {
    let color
    const value = typeInfo[id_subtem][type].available
    if (value === null) {
      color = 'grey'
    } else if (value === true) {
      color = 'blue'
    } else if (value === false) {
      color = 'red'
    }

    return { color: color }
  }

  // Formateo general del contenido
  const formattedTopics = Object.entries(temas).map(([tema_id, { nombre, subtemas }]) => (
    <div key={tema_id}>
      <h3>{nombre}</h3>
      {subtemas.map((subtem) => (
        <div key={subtem.id}>
          <span style={setStyle(subtem.id)}>{subtem.nombre}</span>
          <br />
          {practice(subtem.id) ? (
            <span>
              MODO PRACTICA:
              <br />
            </span>
          ) : null}
          {goals(subtem.id, "mo")}
          <br />
          <Link
            to={{ pathname: '/MOPage' }}
            state={{ subtem: subtem.id, practice_mode: practice(subtem.id), available: typeInfo[subtem.id]["mo"].available }}
            style={available(subtem.id, "mo")}>
            Opción Múltiple</Link>
          <br />
          {goals(subtem.id, "c")}
          <br />
          <Link
            to={{ pathname: '/Compiler' }}
            state={{ subtem: subtem.id }} //practicemode?
            style={available(subtem.id, "c")}>
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