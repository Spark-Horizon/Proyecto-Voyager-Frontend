import { useState } from 'react';
import { CustomNavbar } from "../../components/CustomNavbar"

export const TeacherInterface = () => {
  
  // Links y componentes de Navbar
  const navbar = {
    links: [],
    tabs: [],
    components: []
  }

  // SPA aplication
  const [selectedTab, setSelectedTab] = useState('');

  return (
  
    <section className='teacher-page'>
      
      <CustomNavbar tabs={navbar.tabs} setSelectedTab={setSelectedTab} links={navbar.links} components={navbar.components}/>
      
      <div>Teacher Interface</div>
      
      {selectedTab}

    </section>
  )
}
