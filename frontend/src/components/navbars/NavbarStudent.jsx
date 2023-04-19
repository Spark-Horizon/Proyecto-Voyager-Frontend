// Navbar responsiva de interfaz de estudiante

export const NavbarStudent = ({user}) => {
  return (
    <nav className="navbar" id='navbar-student'>
        <div className="container-fluid navbarContent">

            <a className="navbar-brand container-c" href="/landing">iCode</a>

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
                    </ul>

                    <div className="container-c">
                        <div className="userName">
                            Hola {user}
                        </div>
                    </div>
            </div>
        </div>
    </nav>
  )
}
