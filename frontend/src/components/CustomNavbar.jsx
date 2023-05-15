import { Link } from 'react-router-dom';
import '../styles/navbar.css'
import { ReactComponent as BurguerMenu } from '../assets/svg/hamburguer_menu.svg';


export const CustomNavbar = (props) => {

    const toggleBtn = document.querySelector('.toggle_btn')
    const toggleBtnIcon = document.querySelector('.toggle_btn svg')
    const dropdownMenu = document.querySelector('.navLinks')


    return (
        <nav className="customNavbar container-cc">

            <div className="navContent container-fluid">
                <Link to='/' className="brand">Voyager</Link>
            
                <div className="navProps">
                    <ul className='navLinks container-cc'>
                        {props.links.map((link, index) => (
                            <li className="navItem">
                                <Link key={index} to={link.url}>{link.text}</Link>
                            </li>
                        ))}
                    </ul>

                    <div className="navComponents container-cc">
                    {props.components.map((c, index) => (
                        <div className='navComponent' key={index}>{c.component}</div>
                    ))}
                    </div>
                    
                    <div className="toggle_btn container-cc">
                        <BurguerMenu/>
                    </div>
                </div>

            </div>

        </nav>
    )
}
