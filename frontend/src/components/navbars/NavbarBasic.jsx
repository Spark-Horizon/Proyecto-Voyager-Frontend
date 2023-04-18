// Navbar responsiva intermedia entre landing e interfaz de usuario

import logo from '../../assets/svg/isotipo_color.svg';

export const NavbarBasic = () => {

  return (
<nav className="navbar" id='navbar-basic'>
    <div className="container-fluid navbarContent">
        <a className="navbar-brand container-c" href="/landing">
          <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-text-top me-2" />
          iCode
        </a>
    </div>
</nav>
  );
};

