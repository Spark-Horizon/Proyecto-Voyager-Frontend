import { useState } from 'react';
import { CustomNavbar } from "../../components/CustomNavbar"

export const AdminInterface = () => {

  // Links y componentes de Navbar
  const navbar = {
    links: [],
    tabs: [],
    components: []
  }

  // SPA aplication
  const [selectedTab, setSelectedTab] = useState('');

  return (
    <section className='admin-page'>

      <CustomNavbar tabs={navbar.tabs} setSelectedTab={setSelectedTab} links={navbar.links} components={navbar.components}/>
      
      <div>Admin Interface</div>

      {selectedTab}

    </section>
  )
}
