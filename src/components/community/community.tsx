/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion, useMotionValue } from "framer-motion";
import { useRef } from "react";
import TransitionEffect from "@/utils/TransitionEffect";
import CommunityLayout from "@/utils/CommunityLayout";
import { Link } from "react-router-dom";
import AnimatedText from "@/utils/AnimatedText";
import { useGetCommunityQuery } from "@/redux/features/community/communityApi";

const FramerImage = motion.img;
type TCommunity = {
  title: string;
  img: string;
  link: string;
  date?: string;
};
const MovingImage = ({ title, img, link }: TCommunity) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imageRef = useRef<HTMLImageElement>(null);

  function handleMouse(event: any) {
    if (imageRef.current) {
      imageRef.current.style.display = "inline-block";
      x.set(event.pageX);
      y.set(-10);
    }
  }

  function handleMouseLeave(event: any) {
    if (imageRef.current) {
      imageRef.current.style.display = "none";
      x.set(0);
      y.set(0);
    }
  }

  return (
    <Link to={link} onMouseMove={handleMouse} onMouseLeave={handleMouseLeave}>
      <h2 className="capitalize md:text-xl text-sm font-bold underline dark:text-light">
        {title}
      </h2>
      <FramerImage
        style={{ x: x, y: y }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
        ref={imageRef}
        src={img}
        alt={title}
        className="z-10  w-96 h-auto hidden absolute rounded-lg sm:hidden"
        sizes="(mix-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw "
      />
    </Link>
  );
};

const CommunityPost = ({ img, title, date, link }: TCommunity) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative w-full p-4 py-6 my-4 rounded-xl flex justify-between items-center bg-light text-dark first:mt-0 border border-solid border-dark border-r-4 border-b-4 dark:border-light dark:bg-dark sm:flex-col"
    >
      <div className="flex items-center justify-between  w-full">
        <MovingImage title={title} img={img} link={link} />
        <span className=" font-semibold pl-4 dark:text-light  sm:self-start sm:pl-0 xs:text-sm">
          {date}
        </span>
      </div>
    </motion.li>
  );
};

export default function Community() {
  const { data: communityPost } = useGetCommunityQuery(undefined);
  console.log("🚀 ~ Community ~ communityPots:", communityPost);
  return (
    <>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <CommunityLayout className="pt-16">
          <AnimatedText
            text="Our Gratitude Knows No Bounds"
            className="mb-16 lg:!text4xl sm:mb-8 sm:!text-2xl  !text-2xl"
          />
          {/* <h2 className="font-bold text-4xl w-full text-center my-16 mt-32"></h2> */}
          <ul>
            {communityPost &&
              communityPost?.data?.map((post: any, index: any) => (
                <CommunityPost
                  key={index}
                  title={post?.title}
                  date={post?.createdAt}
                  link={`/community/${post?._id}`}
                  img={post?.image}
                  
                />
              ))}
          </ul>
        </CommunityLayout>
      </main>
    </>
  );
}
