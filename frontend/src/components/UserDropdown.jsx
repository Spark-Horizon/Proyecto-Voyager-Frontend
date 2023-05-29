import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from './CustomButton';
import { useAuth } from '../hooks/AuthContext';

export const UserDropdown = (props) => {
  
  // Estados del componente
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { logout } = useAuth()

  // Funcionalidades del componente
  async function handleLogout(){
    setError('')
    try {
      await logout()
      navigate('/')

    } catch {}
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="userDropdown-btn dropdown-toggle" onClick={toggleDropdown} data-bs-toggle="dropdown">
        {props.user.name}
      </button>
      {isOpen && (
        <ul className="userDropdown-menu dropdown-menu dropdown-menu-right dropdown-menu-dark">
          
          <div className='userInfo'>
            <h6 className='dropdown-header fw-bold'>Hola, {props.user.name}</h6>
            <p className='dropdown-header'>{props.user.id}</p>
          </div>

          <li><hr className="dropdown-divider"/></li>
          <li><CustomButton type={'dropdown-item btn-sm'} text={'Cerrar sesión'} func={handleLogout}/></li>
        </ul>
      )}
    </div>
  );
}
