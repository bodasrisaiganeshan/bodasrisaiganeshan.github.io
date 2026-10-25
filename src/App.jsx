import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Certifications from './components/Certifications.jsx';
import Journey from './components/Journey.jsx';
import Connect from './components/Connect.jsx';
import { useScrollReveal } from './components/useScrollReveal.js';

/** V6, in the order the nav lists it. */
export default function App() {
  useScrollReveal();

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Certifications />
        <Journey />
        <Connect />
      </main>
    </>
  );
}
