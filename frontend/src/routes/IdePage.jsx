import { Compiler } from "../components/IDE/Compiler"
import { Navbar } from "../components/navbars/Navbar"

import '../styles/idePage.css';

export const IdePage = () => {
  return (
    <div>
      <Navbar />
      <div className="ide-main-container">
        <Compiler />
      </div>
    </div>
  )
}
