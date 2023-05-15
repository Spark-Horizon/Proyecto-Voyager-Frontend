import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDropdown } from './../components/UserDropdown';
import { CustomNavbar } from "../components/CustomNavbar"
import { Footer } from "../components/Footer"
import { CustomButton } from '../components/CustomButton';
import { useAuth } from '../hooks/AuthContext';

import '../styles/studentPage.css'

export const StudentPage = ({user}) => {
  
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

  // Links y componentes de Navbar
  const links = [];
  const components = [
    {component: <CustomButton type={'btn'} text={'Cerrar sesión'} func={handleLogout}/>},
  ];

  return (
    <section className="student-page">

        <CustomNavbar links={links} components={components}/>

        <div className="content">
        </div>

        <Footer />
    </section>
  )
}
