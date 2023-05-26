import { CustomNavbar } from '../components/CustomNavbar';
import { Footer } from '../components/Footer';
import { SummaryResults } from '../components/student/SummaryResults';

import '../styles/activitiesStyles.css';

export const SummaryPage = () => {
    // Links y componentes de Navbar
    const links = [
      { text: 'Lenguajes', url: '/' },
      { text: 'Contáctanos', url: '/' },
    ];
    const components = [];

    return (
      <section id='activitiesPage'>

          <CustomNavbar links={links} components={components}/>
          <SummaryResults/>

          <Footer/>
      </section>
    )
}
