import { Path } from "../../components/Path/Path";

export const PathPage = ({materia_id}) => {
  const id_materia = materia_id;
    return (
      <div>
        <div className="ide-main-container">
          <Path materia_id={id_materia}/>
        </div>
      </div>
    )
}

