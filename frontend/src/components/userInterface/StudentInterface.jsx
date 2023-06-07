import { UserDropdown } from '../UserDropdown';
import { CustomNavbar } from "../CustomNavbar";
import { Footer } from "../Footer";
import { useState } from 'react';
import { PendingQuizzes } from '../student/PendingQuizzes';
import { SummaryResults } from '../student/SummaryResults';
import { PathPage } from '../student/PathPage';
import { useAuth } from '../../hooks/AuthContext';

export const StudentInterface = () => {

  const { user } = useAuth();

  // Links y componentes de Navbar
  const navbar = {
    tabs: [
      {text: 'Path', component: <PathPage/>},
      {text: 'Pending Page', component: <PendingQuizzes/>},
      {text: 'Summary Page', component: <SummaryResults/>},
    ],
    components: [
      {component: <UserDropdown user={user}/>},
    ]
  };

  const [currentTab, setCurrentTab] = useState(navbar.tabs[0].component);

  // Tabs

  return (
    <section id='activitiesPage'>

      <CustomNavbar tabs={navbar.tabs} setSelectedTab={setCurrentTab} components={navbar.components}/>
      
      {currentTab}

      <Footer />
      
    </section>
  );
}
