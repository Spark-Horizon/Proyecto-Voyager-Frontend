import { useGetPath } from '../../hooks/useGetPath.js'
import { useGetUnlocked } from '../../hooks/useGetUnlocked.js';
import { useAvailableType } from '../../hooks/useAvailableType.js';
import { useAuth } from '../../hooks/AuthContext.js';
import { TemaCard } from './TemaCard.jsx';
import { SubtemaCard } from './SubtemaCard.jsx';

export const Path = ({ materia_id }) => {
  const { user } = useAuth();
  const user_id = user.id;
  const { path, temas } = useGetPath(materia_id); // Obtener datos del camino basado en el ID de la materia
  const { unlockedPath } = useGetUnlocked(materia_id, user_id); // Obtener datos desbloqueados basados en el ID de la materia
  const { typeInfo } = useAvailableType(path, unlockedPath);

  if (!path || !unlockedPath || !temas || !typeInfo) {
    return <div>Cargando...</div>; // Mostrar mensaje de carga si no hay datos disponibles
  }

  console.log(unlockedPath);

  // Formateo general del contenido
  const formattedTopics = Object.entries(temas).map(([tema_id, { nombre, subtemas }]) => (
    /*<div key={tema_id}>
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
            state={{ subtem: subtem.id, practice_mode: practice(subtem.id), path: path, materia: materia_id }}
            style={available(subtem.id, "mo")}>
            Opción Múltiple</Link>
          <br />
          {goals(subtem.id, "c")}
          <br />
          <Link
            to={{ pathname: '/Compiler' }}
            state={{ subtem: subtem.id, practice_mode: practice(subtem.id), path: path, materia: materia_id }}
            style={available(subtem.id, "c")}>
            Código</Link>
        </div>
      ))}
    </div>*/
    
    <TemaCard key={tema_id}
      title={nombre}
      children={
        subtemas.map((subtem) => (
          <SubtemaCard key={subtem.id}
            typeInfo={typeInfo}
            unlockedPath={unlockedPath}
            id={subtem.id}
            title={subtem.nombre}
          />
        ))
      }
    />
  ));

  return (
    <div className='container-cc'>
      <div className='path-container'>
        {formattedTopics}
      </div>
    </div>
  )
}