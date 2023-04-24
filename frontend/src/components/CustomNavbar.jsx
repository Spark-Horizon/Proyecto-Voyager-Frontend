import { Link } from 'react-router-dom';

export const CustomNavbar = (props) => {
    const { links, components } = props
    return (
        <nav className="customNavbar">

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
                    <div key={index}>{c.component}</div>
                ))}
                </div>

            </div>

        </nav>
    )
}
