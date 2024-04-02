import { useAppSelector } from "@/redux/hooks";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutUs = () => {
  const view = useRef<HTMLDivElement>(null);
  const inView = useInView(view);
  const { darkMode } = useAppSelector((store) => store.theme);

  const aboutImage = {
    initial: { y: 0, scale: 5 },
    animate: {
      y: 15,
      scale: 1,
      transition: {
        duration: 1,
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <div className={`bg-slate-100  ${darkMode ? "bg-[#18191A] " : ""}`}>
      <motion.div
        ref={view}
        className="py-20 overflow-hidden"
        animate={
          inView
            ? { opacity: 1, y: 0, transition: { duration: 1 } }
            : { opacity: 0, y: -200, transition: { duration: 1 } }
        }
      >
        <div className="text-center mb-20">
          <h4 className="text-secondary text-lg font-semibold mb-3">
            About Us
          </h4>
          <h2 className="text-2xl md:text-3xl lg:text-4xl  font-bold mb-2">
            We Work For People
          </h2>
        </div>
        <div className="w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-2 justify-items-center-between items-center gap-5 lg:gap-20">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-5">About Us</h1>
            {/* <AnimatedUnderline /> */}
            <p
              className={`text-slate-700 dark:text-slate-400 ${
                darkMode ? "text-white" : ""
              }`}
            >
              The Post-Disaster Community Health and Medical Supply Chain
              Platform is a robust system designed to ensure swift and efficient
              distribution of essential medical resources in the aftermath of
              disasters. Leveraging advanced technology, the platform
              centralizes inventory management, logistics, and communication
              channels to coordinate relief efforts seamlessly. It integrates
              real-time data analytics to anticipate demand, optimize routing,
              and prioritize critical supplies. Additionally, the platform
              facilitates collaboration among stakeholders including government
              agencies, NGOs, and healthcare providers, enhancing response
              coordination and resilience. Ultimately, this innovative solution
              aims to save lives by expediting access to vital medical resources
              during crises.
            </p>
          </div>
          <motion.div variants={aboutImage} initial="initial" animate="animate">
            <img
              className="w-full max-h-96"
              src={
                "https://miro.medium.com/v2/resize:fit:824/1*vyqDHrEgTcr0ndDE8Dd7Ig.jpeg"
              }
              alt=""
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
