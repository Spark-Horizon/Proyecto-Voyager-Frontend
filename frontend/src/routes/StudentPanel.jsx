import { Path } from "../components/Path/Path"
import { Link } from 'react-router-dom';
import { CustomNavbar } from "../components/CustomNavbar"

import '../styles/idePage.css';


export const StudentPanel = () => {

  // Links y componentes de Navbar
  const links = [
    { text: 'Link1', url: '/' },
    { text: 'Link2', url: '/' },
    { text: 'Link3', url: '/' },
  ];
  const components = [
      {component: <Link></Link>},
  ];

  //
  const materia_id = "TC1028";
  return (
    <div>
      <CustomNavbar links={links} components={components}/>
      <div className="ide-main-container">
        <Path materia_id={materia_id}/>
      </div>
    </div>
  )
}
