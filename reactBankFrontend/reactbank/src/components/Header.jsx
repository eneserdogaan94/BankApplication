import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

 import '../css/Header.css';

function Header({OpenSidebar}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
      // Oturum bilgilerini temizle
      localStorage.removeItem('token');
      localStorage.clear();

      // Kullanıcıyı giriş sayfasına yönlendir
      navigate("/");
  };
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            
            <BsPersonCircle className="icon" onClick={toggleMenu} />
            {isOpen && (
                <ul className="submenu">
                    <li>Change Account</li>
                    <li onClick={handleLogout}>Çıkış Yap</li>
                </ul>
            )}
        </div>
    </header>
  )
}

export default Header