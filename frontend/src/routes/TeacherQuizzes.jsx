import { CustomNavbar } from '../components/CustomNavbar';
import { TeacherExercise } from "../components/teacher/TeacherExercise";
import { Footer } from '../components/Footer';

import '../styles/quizzesCreationStyles.css';

export const TeacherQuizzes = () => {
    // Links y componentes de Navbar
    const links = [];
    const components = [];

    return (
    <section id='teacherQuizSection'>
        <CustomNavbar links={links} components={components}/>
        <TeacherExercise/>

        <Footer/>
    </section>
    );
}