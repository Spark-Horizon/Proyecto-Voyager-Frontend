import { CustomNavbar } from '../components/CustomNavbar';
import { Footer } from '../components/Footer';
import { SummaryResults } from '../components/student/SummaryResults';

import '../styles/landingPage.css';

export const SummaryPage = () => {
    // Links y componentes de Navbar
    const links = [
      { text: 'Lenguajes', url: '/' },
      { text: 'Contáctanos', url: '/' },
    ];
    const components = [];

    return (
      <section id='landingPage'>

          <CustomNavbar links={links} components={components}/>
          <SummaryResults/>

          <Footer/>
      </section>
    )
}
