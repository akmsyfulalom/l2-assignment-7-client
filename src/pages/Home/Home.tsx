import AboutUs from "@/components/homeComponents/about";
import Cards from "@/components/homeComponents/Card";
import Gallery from "@/components/homeComponents/Gallery";
import Hero from "@/components/homeComponents/Hero";
import OurMission from "@/components/homeComponents/OurMission";
import { Testimonials } from "@/components/homeComponents/Testimonials";

const Home = () => {
  return (
    <div className="max-w-[1280px] mx-auto">
      <Hero />
      <AboutUs />
      <Cards />
      <Testimonials />
      <Gallery />
      <OurMission />
    </div>
  );
};

export default Home;
