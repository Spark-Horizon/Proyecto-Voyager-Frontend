import { useState } from 'react';
import { CustomNavbar } from "../../components/CustomNavbar"
import { UserDropdown } from '../UserDropdown';

export const AdminInterface = (props) => {

  // Links y componentes de Navbar
  const navbar = {
    links: [],
    tabs: [],
    components: [{component: <UserDropdown user={props.user}/>}]
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
