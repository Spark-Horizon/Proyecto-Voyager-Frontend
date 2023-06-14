import { Link } from "react-router-dom";
import { ReactComponent as SparkHorizonLogo } from '../assets/svg/isologo_white.svg';


export const Footer = () => {

  return (
    <footer className='footer'>
      <div className="footer-container">
        <SparkHorizonLogo/>
        <ul className='fotterLinks'>
          <li><Link to='/'>La tripulación</Link></li>
          <li><Link to='/'>Preguntas frecuentes</Link></li>
          <li><Link to='/'>Terminos de uso</Link></li>
          <li><Link to='/'>Política de privacidad</Link></li>
          <li><Link to='/'>Ayuda</Link></li>
          <li><Link to='/'>Acerca de Voyager</Link></li>
        </ul>
        <p>&copy; 2023 SparkHorizon. Todos los derechos reservados.</p>
        <p>Voyager es una plataforma de aprendizaje gratuita, su contenido está sujeto a disponibilidad. Voyager fue diseñado y desarrollado por el equipo de Spark Horizon, startup latinoamericana de desarrollo de software formada durante la unidad de formación: Desarrollo e implantación de sistemas de software.</p>
      </div>
    </footer>
  );
};
