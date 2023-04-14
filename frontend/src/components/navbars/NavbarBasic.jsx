// Navbar responsiva intermedia entre landing e interfaz de usuario

import logo from '../../assets/svg/isotipo_color.svg';

export const NavbarBasic = () => {
  const handleLogoClick = () => {
    alert('FUNCIONA!');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-text-top me-2" />
          iCode
        </a>
      </div>
    </nav>
  );
};

