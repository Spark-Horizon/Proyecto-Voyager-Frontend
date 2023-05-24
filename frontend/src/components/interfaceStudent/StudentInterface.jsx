import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDropdown } from '../../components/UserDropdown';
import { ProvitionalTab } from '../../components/interfaceStudent/studentTabs'
import { CustomNavbar } from "../../components/CustomNavbar"
import { Footer } from "../../components/Footer"
import { CustomButton } from '../../components/CustomButton';
import { useAuth } from '../../hooks/AuthContext';

export const StudentInterface = ({user}) => {

  // Estados del componente
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { logout } = useAuth()

  // Funcionalidades del componente
  async function handleLogout(){
    setError('')
    try {
      await logout()
      navigate('/')

    } catch {}
  }

  // SPA aplication
  const [selectedTab, setSelectedTab] = useState(<ProvitionalTab user={user}/>);
  
  // Links y componentes de Navbar
  const navbar = {
    links: [],
    tabs: [],
    components: [{component: <CustomButton type={'btn btn-sm btnPrimary'} text={'Cerrar sesión'} func={handleLogout}/>}]
  }
  /*const navbar = {
    links: [],
    tabs: [ {component: <ProvitionalTab/>,text: 'Atrevete'}],
    components: [{component: <CustomButton type={'btn btn-sm btnPrimary'} text={'Cerrar sesión'} func={handleLogout}/>}]
  }*/

  return (
    <section className="student-page">

      <CustomNavbar tabs={navbar.tabs} setSelectedTab={setSelectedTab} links={navbar.links} components={navbar.components}/>
      
      {selectedTab}

      <Footer />
      
    </section>
  )
}
