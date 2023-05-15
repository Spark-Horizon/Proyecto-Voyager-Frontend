import { useGetPath } from '../../hooks/useGetPath.js';


export const Path = ({ materia_id }) => {
  const { data } = useGetPath(materia_id);

  if (!data) {
    return <div>Cargando...</div>;
  }

  /*
   * Ale: El color del elemento depende del tema.
   * Los colores del tema nos lo compartieron en el mapa del Map.
   */
  
  const formattedSubtems = data.map((subtem) => (
    <div>
      <p>{subtem.nombre}</p>
    </div>
  ));

  return (
    <div>
      <p> {formattedSubtems} </p>
    </div>
  )
}


// alumn_subtem implementation