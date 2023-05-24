import { useState } from 'react';
import { CustomNavbar } from "../../components/CustomNavbar"
import { CustomButton } from '../CustomButton';

import { useNavigate } from 'react-router-dom';
import { UserDropdown } from '../../components/UserDropdown';
import { useAuth } from '../../hooks/AuthContext';

export const TeacherInterface = () => {

  // Estados del componente
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { logout } = useAuth()
  
  // Links y componentes de Navbar
  const navbar = {
    links: [],
    tabs: [],
    components: [{component: <CustomButton type={'btn btn-sm btnPrimary'} text={'Cerrar sesión'} func={handleLogout}/>}]
  }

  // Funcionalidades del componente
  async function handleLogout(){
    setError('')
    try {
      await logout()
      navigate('/')

    } catch {}
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
