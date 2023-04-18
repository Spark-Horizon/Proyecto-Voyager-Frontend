import { Navbar } from "../components/navbars/indexNavbars"
import { Footer } from "../components/footers/indexFooters"

import '../styles/landingPage.css'

export const LandingPage = () => {
    return (
        <section className="landing-page">
            <Navbar />
            <div className="content">
            </div>
            <Footer />
        </section>
    )
}
