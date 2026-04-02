import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';
import { Featured } from './components/sections/Featured';
import { About } from './components/sections/About';
import { Process } from './components/sections/Process';
import { Pricing } from './components/sections/Pricing';
import { Reach } from './components/sections/Reach';
import { Testimonials } from './components/sections/Testimonials';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import { WhatsAppButton } from './components/ui/WhatsAppButton';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <Featured />
        <Reach />
        <Process />
        <Testimonials />
        <About />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
