import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { HandHelping, HeartHandshake, ShieldHalf } from "lucide-react";

const intro = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.25,
      delayChildren: 0.5,
    },
  },
};

const introChildren = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: "spring", bounce: 0.5 },
  },
};

const icons = {
  initial: { y: 0 },
  animate: {
    y: 10,
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

const OurMission = () => {
  const view = useRef<HTMLDivElement>(null);
  const inView = useInView(view);
  return (
    <div className="py-20">
      <div className="text-center mb-20">
        <h4 className="">JOIN OUR MISSION</h4>
        <h2 className="text-2xl font-bold lg:text-4xl text-center mt-3 mb-20">
          How Can You Help
        </h2>
      </div>
      <motion.div
        className="w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 justify-items-center items-center gap-5 text-center"
        ref={view}
        variants={intro}
        initial="hidden"
        animate={inView ? "visible" : ""}
      >
        <motion.div
          className="flex justify-center items-center gap-2 flex-col"
          variants={introChildren}
        >
          <motion.div variants={icons} initial="initial" animate="animate">
            <ShieldHalf size={100} />
          </motion.div>
          <h2 className="text-primary dark:text-white text-2xl font-bold">
            Empowerment Approach:
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            Description: Empowering individuals or communities by providing them
            with the necessary resources, skills, and knowledge to solve their
            own problems and achieve their goals. This approach focuses on
            building self-reliance and resilience, fostering long-term
            sustainability and independence
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center items-center gap-2 flex-col"
          variants={introChildren}
        >
          <motion.div variants={icons} initial="initial" animate="animate">
            <HandHelping size={100} />
          </motion.div>
          <h2 className="text-primary dark:text-white text-2xl font-bold">
            Collaborative Support:
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            Description: Collaborating with individuals, organizations, or
            communities to address challenges collectively. By pooling
            resources, expertise, and perspectives, collaborative support
            fosters synergy and mutual benefit, enabling more comprehensive and
            effective solutions to be developed and implemented.
          </p>
        </motion.div>

        <motion.div variants={introChildren}>
          <div className="flex justify-center items-center gap-2 flex-col">
            <motion.div variants={icons} initial="initial" animate="animate">
              <HeartHandshake size={100} />
            </motion.div>
            <h2 className="text-primary dark:text-white text-2xl font-bold">
              Holistic Assistance:
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              Description: Providing comprehensive support that addresses
              various aspects of an individual's or community's needs, including
              physical, mental, social, and economic well-being. This approach
              recognizes the interconnectedness of different challenges and aims
              to provide integrated solutions that promote overall health,
              resilience, and prosperity.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OurMission;
