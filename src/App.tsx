import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import SavingsCalculator from './components/SavingsCalculator'
import WhySunZero from './components/WhySunZero'
import SolutionsSection from './components/SolutionsSection'
import TeamSection from './components/TeamSection'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div style={{ width: '100%', background: 'white' }}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SavingsCalculator />
      <WhySunZero />
      <SolutionsSection />
      <TeamSection />
      <Footer />
    </div>
  )
}

export default App
