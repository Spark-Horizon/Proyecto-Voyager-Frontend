import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from './CustomButton';
import { useAuth } from '../hooks/AuthContext';

export const UserDropdown = () => {
  
  // Estados del componente
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { user } = useAuth();

  // Funcionalidades del componente
  async function handleLogout(){
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
      <button className="userDropdown-btn dropdown-toggle" onClick={toggleDropdown} data-bs-toggle="dropdown" data-bs-auto-close="outside">
        <p style={{marginRight: 10}}>{user.name}</p>
      </button>
      {isOpen && (
        <ul className="userDropdown-menu dropdown-menu dropdown-menu-right dropdown-menu-dark">
          
          <div className='userInfo'>
            <h6 className='dropdown-header fw-bold'>Hola, {user.name}</h6>
            <p className='dropdown-header'>{user.id}</p>
          </div>

          <li><hr className="dropdown-divider"/></li>
          <li><CustomButton type={'dropdown-item btn-sm'} text={'Cerrar sesión'} func={handleLogout}/></li>
        </ul>
      )}
    </div>
  );
}
