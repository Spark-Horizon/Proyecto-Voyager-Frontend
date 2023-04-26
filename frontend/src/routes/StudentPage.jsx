import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const links = [
    { text: 'jajaja', url: '/' },
    { text: 'jejeje', url: '/about' },
    { text: 'jijiji', url: '/contact' },
  ];
  const components = [
    {component: <Link><CustomButton text={'botón1'}/></Link>},
    {component: <Link><CustomButton text={'botón2'}/></Link>},
    {component: <CustomButton text={'Cerrar sesión'} func={handleLogout}
    />}
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
