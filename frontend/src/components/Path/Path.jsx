import { useGetPath } from '../../hooks/useGetPath.js'
import { useGetUnlocked } from '../../hooks/useGetUnlocked.js';
import { useAvailableType } from '../../hooks/useAvailableType.js';
import { useAuth } from '../../hooks/AuthContext.js';
import { TemaCard } from './TemaCard.jsx';
import { SubtemaCard } from './SubtemaCard.jsx';
import { Loading } from '../Loading.jsx';

import '../../styles/Path/path.css'
import '../../styles/Groups/Groups.css'

export const Path = ({ materia_id }) => {
  const { user } = useAuth();
  const user_id = user.id;
  const { path, temas } = useGetPath(materia_id); // Obtener datos del camino basado en el ID de la materia
  const { unlockedPath } = useGetUnlocked(materia_id, user_id); // Obtener datos desbloqueados basados en el ID de la materia
  const { typeInfo } = useAvailableType(path, unlockedPath);

  if (!path || !unlockedPath || !temas || !typeInfo || !user) {
    return <div className="container-cc loading-container"><Loading/></div>; // Mostrar mensaje de carga si no hay datos disponibles
  }

  // Formateo general del contenido
  const formattedTopics = Object.entries(temas).map(([tema_id, { nombre, subtemas }], index) => (
    
    <TemaCard key={tema_id}
      title={nombre}
      children={
        subtemas.map((subtem) => (
          <SubtemaCard key={subtem.id}
            typeInfo={typeInfo}
            unlockedPath={unlockedPath}
            id={subtem.id}
            title={subtem.nombre}
            path={path}
            materia={materia_id}
          />
        ))
      }
    />
  ));

  return (
    <div className='path-container'>
      {formattedTopics}
    </div>
  )
}