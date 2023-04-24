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
    ];
    const components = [
        {component: <Link><CustomButton text={'botón1'}/></Link>},
        {component: <Link><CustomButton text={'botón2'}/></Link>}
    ]

    return (
        <section className="landing-page">
            <CustomNavbar links={links} components={components}/>
            <div className="content">
            </div>
            <Footer />
        </section>
    )
}
