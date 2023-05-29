import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as BurguerMenu } from '../assets/svg/hamburguer_menu.svg';
import '../styles/navbar.css'


export const CustomNavbar = (props) => {

    const toggleBtn = document.querySelector('.toggle_btn')
    const toggleBtnIcon = document.querySelector('.toggle_btn svg')
    const dropdownMenu = document.querySelector('.navLinks')

    // Props
    const links = props.links ? props.links : [];
    const tabs = props.tabs ? props.tabs : [];
    const components = props.components ? props.components : [];

    const handleTabClick = (tab) => {
        props.setSelectedTab(tab);
    };

    return (
        <nav className="customNavbar container-cc">

            <div className="navContent container-fluid">
                <Link to='/' className="brand">Voyager</Link>
            

                <div className="navRight">
                    <ul className='navTabs container-cc'>
                        {tabs.map((tab, index) => (
                            <li className="navItem" key={index}
                            onClick={() => handleTabClick(tab.component)}>{tab.text}</li>
                        ))}
                    </ul>
                    
                    <ul className='navLinks container-cc'>
                        {links.map((link, index) => (
                            <li className="navItem" key={index}>
                                <Link key={index} to={link.url}>{link.text}</Link>
                            </li>
                        ))}
                    </ul>

                    <div className="navComponents container-cc">
                    {components.map((c, index) => (
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
