import {
    HeroSection,
    Footer,
    FeaturesSection,
    Navbar,
    Testimonials,

} from "../components"
import { styles } from "../constants"

const LandingPage = () => {
    return (

        <div className='bg-primary w-full overflow-hidden scroll-smooth min-h-screen'>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>

            <div className="flex justify-center items-start">
                <div className={`${styles.boxWidth}`}>
                    <HeroSection />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <FeaturesSection />
                    <Testimonials />
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default LandingPage