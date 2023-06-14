import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as BurguerMenu } from '../assets/svg/hamburguer_menu.svg';
import '../styles/navbar.css';

export const CustomNavbar = (props) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.customNavbar');
      const navbarOffset = navbar.offsetTop;
      const scrollPosition = window.pageYOffset;

      setIsNavbarVisible(scrollPosition <= navbarOffset);
    };

    const handleVisibilityChange = () => {
      setIsNavbarFixed(!document.hidden);
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleTabClick = (tab) => {
    props.setSelectedTab(tab);
  };

  const { links = [], tabs = [], components = [] } = props;

  return (
    <>
      <nav className={`customNavbar container-cc ${isNavbarVisible ? '' : 'navbarHidden'} ${isNavbarFixed ? 'navbarFixed' : ''}`}>
        <div className="navContent container-fluid">
          <Link to="/" className="brand">
            Voyager
          </Link>

          <div className="navRight">
            <ul className="navTabs container-cc">
              {tabs.map((tab, index) => (
                <li className="navItem" key={index} onClick={() => handleTabClick(tab.component)}>
                  {tab.text}
                </li>
              ))}
            </ul>

            <ul className="navLinks container-cc">
              {links.map((link, index) => (
                <li className="navItem" key={index}>
                  <Link key={index} to={link.url}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="navComponents container-cc">
              {components.map((c, index) => (
                <div className="navComponent" key={index}>
                  {c.component}
                </div>
              ))}
            </div>

            <div className="toggle_btn container-cc">
              <BurguerMenu />
            </div>
          </div>
        </div>
      </nav>
      {isNavbarFixed && <div className="navbarPlaceholder" />}
    </>
  );
};
