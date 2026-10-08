import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Highlights from "./components/Highlights/Highlights";
import About from "./components/About/About";
import Academics from "./components/Academics/Academics";
import Facilities from "./components/Facilities/Facilities";
import Gallery from "./components/Gallery/Gallery";
import AdmissionBanner from "./components/AdmissionBanner/AdmissionBanner";
import Footer from "./components/Footer/Footer";
import "./App.css";
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Academics />
        <Facilities />
        <Gallery />
        <AdmissionBanner />
      </main>
      <Footer />
    </>
  );
}
