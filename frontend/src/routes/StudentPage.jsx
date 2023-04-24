import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavbarStudent } from "../components/navbars/indexNavbars"
import { Footer } from "../components/footers/indexFooters"
import { CustomButton } from '../components/buttons/indexButtons';
import { useAuth } from '../hooks/AuthContext';

import '../styles/studentPage.css'

export const StudentPage = ({user}) => {
  
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { logout } = useAuth()

  async function handleLogout(){
    setError('')
    try {
      await logout()
      navigate('/')

    } catch {}
  }

  return (
    <section className="student-page">
        <NavbarStudent user={user}/>
        <div className="content">
          <CustomButton
            type={'btn mt-3 btn-primary btnPrimary'}
            text={'Cerrar sesión'}
            func={handleLogout}
          />
        </div>
        <Footer />
    </section>
  )
}
