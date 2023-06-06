import { Path } from "../../components/Path/Path";

export const PathPage = () => {
    const materia_id = "TC1028";
    return (
      <div>
        <div className="ide-main-container">
          <Path materia_id={materia_id}/>
        </div>
      </div>
    )
}
