import { useState } from 'react';
import { CustomNavbar } from "../../components/CustomNavbar"
import { UserDropdown } from '../../components/UserDropdown';

export const TeacherInterface = ({user}) => {

  // Links y componentes de Navbar
  const navbar = {
    links: [],
    tabs: [],
    components: [{component: <UserDropdown user={user}/>}]
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
