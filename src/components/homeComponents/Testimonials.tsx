import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppSelector } from "@/redux/hooks";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { darkMode } = useAppSelector((store) => store.theme);
  // Function to handle auto-sliding
  const handleAutoSlide = () => {
    const newIndex = (currentIndex + 1) % 5; // Assuming 5 items in the carousel
    setCurrentIndex(newIndex);
  };

  React.useEffect(() => {
    const intervalId = setInterval(handleAutoSlide, 3000); // Adjust the
    return () => clearInterval(intervalId);
  }, []);

  const data = [
    {
      title: "Global Health Organization - Lifesaving Support",
      description:
        "This testimonial showcases the invaluable assistance provided by a renowned global health organization in delivering lifesaving medical supplies and personnel to disaster-stricken regions worldwide. Through their swift response and efficient coordination, countless lives were saved, and communities were provided with essential healthcare resources during their most critical hours of need.",
    },
    {
      title: "Emergency Medical Corps - Rapid Response Excellence",
      description:
        "This testimonial highlights the unparalleled rapid response capabilities of an Emergency Medical Corps, demonstrating their ability to mobilize medical teams, deploy emergency medical supplies, and establish field hospitals in disaster-affected areas. Their dedication to saving lives and alleviating suffering serves as a beacon of hope for communities facing the aftermath of disasters.",
    },
    {
      title: "Volunteer Relief Network - Community Resilience",
      description:
        "This testimonial celebrates the impactful contributions of a Volunteer Relief Network in bolstering community resilience in the face of disasters. Through their selfless dedication and tireless efforts, volunteers provided critical support services, distributed essential supplies, and offered compassionate assistance to those in need, empowering communities to rebuild and thrive.",
    },
    {
      title: "National Disaster Response Agency - Coordinated Aid Efforts",
      description:
        "This testimonial commends the National Disaster Response Agency for their exemplary coordination of aid efforts in response to natural disasters. By efficiently mobilizing resources, coordinating multi-agency response teams, and implementing effective disaster preparedness strategies, the agency played a pivotal role in saving lives and mitigating the impact of disasters on affected communities.",
    },
    {
      title: "Medical Supply Logistics Company - Supply Chain Resilience",
      description:
        "This testimonial showcases the indispensable role of a Medical Supply Logistics Company in ensuring the resilience of the medical supply chain during emergencies. Through their expertise in inventory management, transportation logistics, and supply chain optimization, the company facilitated the timely delivery of critical medical supplies to disaster-affected regions, helping to address urgent healthcare needs.",
    },
    {
      title: "Telemedicine Platform - Remote Healthcare Access",
      description:
        "This testimonial highlights the transformative impact of a Telemedicine Platform in providing remote healthcare access to disaster-affected populations. By leveraging innovative telehealth technologies, the platform connected patients with healthcare providers, enabling timely medical consultations, diagnostic assessments, and treatment recommendations, even in the most challenging of circumstances.",
    },
  ];

  return (
    <motion.div
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="mt-28 mb-20"
    >
      <div className="flex flex-col items-center justify-center">
        <span>Testimonial</span>
        <h1 className="text-2xl font-bold lg:text-4xl text-center mt-3 mb-14">
          Our Top 6 Supplier
        </h1>
      </div>

      <div className="flex justify-center items-center mx-3 md:mx-20">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full "
        >
          <CarouselContent>
            {data.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card
                    className={`${
                      darkMode ? "bg-[#18191A] text-white border-gray-600" : ""
                    }`}
                  >
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                      <p className="text-3xl font-semibold">{item?.title}</p>
                      <p> {item?.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={`${darkMode ? " bg-[#18191A]" : ""}`} />
          <CarouselNext className={`${darkMode ? " bg-[#18191A]" : ""}`} />
        </Carousel>
      </div>
    </motion.div>
  );
}
