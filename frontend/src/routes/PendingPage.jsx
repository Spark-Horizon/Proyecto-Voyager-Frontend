import { CustomNavbar } from '../components/CustomNavbar';
import { Footer } from '../components/Footer';
import { PendingQuizzes } from '../components/student/PendingQuizzes';

import '../styles/activitiesStyles.css';

export const PendingPage = () => {
    // Links y componentes de Navbar
    const links = [
      { text: 'Lenguajes', url: '/' },
      { text: 'Contáctanos', url: '/' },
    ];
    const components = [];

    return (
      <section id='activitiesPage'>

          <CustomNavbar links={links} components={components}/>
          <PendingQuizzes/>

          <Footer/>
      </section>
    )
}
