import { Link } from 'react-router-dom';
import { CustomButton } from "../components/CustomButton"
import { CustomNavbar } from "../components/CustomNavbar"
import { Footer } from "../components/Footer"

import '../styles/landingPage.css'

export const LandingPage = () => {

    // Links y componentes de Navbar
    const links = [
        { text: 'Link1', url: '/' },
        { text: 'Link2', url: '/' },
        { text: 'Link3', url: '/' },
        { text: 'Link4', url: '/' },
    ];
    const components = [
        {component: <Link to='/signin'><CustomButton type='btn btnPrimary' text={'Iniciar sesión'}/></Link>},
        {component: <Link to='/signup'><CustomButton type='btn btnPrimary' text={'Crear cuenta'}/></Link>}
    ]

    return (
        <section className="landing-page" id='landingPage'>
            <CustomNavbar links={links} components={components}/>
            <div className="content">
            </div>
            <Footer />
        </section>
    )
}
