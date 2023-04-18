// Componente de Navbar de landing page

import { CustomButton } from '../buttons/indexButtons'
import '../../styles/navbar.css'

export const Navbar = () => {
    return (
        <nav className='navbar' id='navbar-landing'>
            <div className='container-fluid navbarContent'>

                <a className="navbar-brand" href="/landing">iCode</a>

                <div className="links">
                    <ul className='container-cc'>
                        <li className="nav-item">
                            <a className="nav-link" href="/landing">Link 1</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/landing">Link 2</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/landing">Link 3</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/landing">Link 4</a>
                        </li>
                    </ul>

                    <div className="container-cc buttons">
                        <CustomButton text={"Crear cuenta"} func={() => window.location.replace('/signup')} />
                        <CustomButton text={"Iniciar sesión"} func={() => window.location.replace('/signin')} />
                    </div>
                </div>
            </div>
        </nav>
    )
}
