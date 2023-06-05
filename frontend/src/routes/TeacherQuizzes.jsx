import { CustomNavbar } from '../components/CustomNavbar';
import { TeacherActivity, TeacherExercise } from "../components/teacher/TeacherActivity";
import { Footer } from '../components/Footer';

import '../styles/quizzesCreationStyles.css';

export const TeacherQuizzes = () => {
    // Links y componentes de Navbar
    const links = [];
    const components = [];

    return (
        <section id='teacherQuizSection'>

            <CustomNavbar links={links} components={components}/>
            <TeacherActivity
            grupo={2}
            id={'L01732006'}
            />

            <Footer/>
        </section>
    );
}