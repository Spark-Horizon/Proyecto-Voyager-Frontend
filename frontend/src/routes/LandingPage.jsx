import { Link } from 'react-router-dom';
import { CustomButton } from "../components/CustomButton"
import { CustomNavbar } from "../components/CustomNavbar"
import { Footer } from "../components/Footer"

import '../styles/landingPage.css'

export const LandingPage = () => {

    // Links y componentes de Navbar
    const links = [
        { text: 'Lenguajes', url: '/' },
        { text: 'Contactanos', url: '/' },
    ];
    const components = [
        {component: <Link to='/signin'><CustomButton type='btn btn-sm btnPrimary' text={'Iniciar sesión'}/></Link>},
        {component: <Link to='/signup'><CustomButton type='btn btn-sm btnPrimary' text={'Crear cuenta'}/></Link>}
    ]

    return (
        <section id='landingPage'>

            <CustomNavbar links={links} components={components}/>

            <div className="container">

                <div id='section1' className="startSection container-cc">
                    <h2>Escribe <span className='gradient'>código</span> fuera de este mundo</h2>
                    <div className="img">
                        <img className='"img-fluid"' id='moonImage' src={require('../assets/img/image-moon.png')} alt="mooonImage" />
                    </div>
                </div>


            </div>

            <Footer/>
        </section>
    )
}
