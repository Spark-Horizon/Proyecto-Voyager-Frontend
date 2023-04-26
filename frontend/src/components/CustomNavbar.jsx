import { Link } from 'react-router-dom';
import '../styles/navbar.css'

export const CustomNavbar = (props) => {
    return (
        <nav className="customNavbar container-cc">

            <div className="navContent container-fluid">
                <Link to='/' className="brand">iCode</Link>

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

            </div>

        </nav>
    )
}
