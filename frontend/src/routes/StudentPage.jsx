import { NavbarStudent } from "../components/navbars/indexNavbars"
import { Footer } from "../components/footers/indexFooters"

import '../styles/studentPage.css'

export const StudentPage = ({user}) => {
  return (
    <section className="student-page">
        <NavbarStudent user={user}/>
        <div className="content"></div>
        <Footer />
    </section>
  )
}
