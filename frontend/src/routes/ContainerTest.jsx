import React, { useState } from 'react';
import { CustomButton } from '../components/CustomButton';
import { CustomNavbar } from '../components/CustomNavbar';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

import '../styles/landingPage.css';

export const ContainerTest = () => {

    // Links y componentes de Navbar
    const links = [
      { text: 'Lenguajes', url: '/' },
      { text: 'Contáctanos', url: '/' },
  ];
  const components = [
      {component: <Link to='/signin'><CustomButton type='btn btn-sm btnPrimary' text={'Iniciar sesión'}/></Link>},
      {component: <Link to='/signup'><CustomButton type='btn btn-sm btnPrimary' text={'Crear cuenta'}/></Link>},
      {component: <Link to='/pendingquizzes'><CustomButton type='btn btn-sm btnPrimary' text={'Quizzes pendientes'}/></Link>}
  ]

  return (
      <section id='landingPage'>

          <CustomNavbar links={links} components={components}/>


          <Footer/>
      </section>
  )
}
