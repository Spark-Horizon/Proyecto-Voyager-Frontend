import { useState } from 'react';
import { UserDropdown } from '../../components/UserDropdown';
import { ProvitionalTab } from '../../components/interfaceStudent/studentTabs'
import { CustomNavbar } from "../../components/CustomNavbar"
import { Footer } from "../../components/Footer"

export const StudentInterface = ({user}) => {

  // SPA aplication
  const [selectedTab, setSelectedTab] = useState(<ProvitionalTab user={user}/>);
  
  // Links y componentes de Navbar
  const navbar = {
    components: [
      {component: <UserDropdown user={user}/>},
    ]
  }
  /*const navbar = {
    links: [],
    tabs: [ {component: <ProvitionalTab/>,text: 'Atrevete'}],
    components: [{component: <CustomButton type={'btn btn-sm btnPrimary'} text={'Cerrar sesión'} func={handleLogout}/>}]
  }*/

  return (
    <section className="student-page">

      <CustomNavbar components={navbar.components}/>
      
      {selectedTab}

      <Footer />
      
    </section>
  )
}
