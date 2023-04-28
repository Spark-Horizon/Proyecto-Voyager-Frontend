import { CodeInstructions } from "../components/IDE/CodeInstructions"
import { Compiler } from "../components/IDE/Compiler"
import { CustomNavbar } from "../components/CustomNavbar"

import '../styles/idePage.css';


export const IdePage = () => {

  // Links y componentes de Navbar
  const links = [];
  const components = [];

  const codeId = "TC1028_21_C_10";
  return (
    <div>
      <CustomNavbar links={links} components={components}/>
      <div className="ide-main-container">
        <CodeInstructions problem_id={codeId}/>
        <Compiler />
      </div>
    </div>
  )
}
