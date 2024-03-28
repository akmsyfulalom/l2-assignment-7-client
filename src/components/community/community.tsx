/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion, useMotionValue } from "framer-motion";
import { useRef } from "react";
import TransitionEffect from "@/utils/TransitionEffect";
import CommunityLayout from "@/utils/CommunityLayout";
import { Link } from "react-router-dom";
import AnimatedText from "@/utils/AnimatedText";

const mypic =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQMGBwECAP/EADYQAAIBAwMBBgQEBgIDAAAAAAECAwAEEQUSITEGEyJBUWEycYGRBxQjsUKhotHw8WLBJCVS/8QAGAEAAgMAAAAAAAAAAAAAAAAAAgQAAQP/xAAhEQACAgEEAwEBAAAAAAAAAAAAAQIRIQMSMUEiUWEEE//aAAwDAQACEQMRAD8AYXUSuGCN484wVxj3NfQAINzvHgDAzzzXJb+KJ1UJ3rkbeOg5oK5v+6kREMEYzxxg/P7/ALVkrZmxlNelUCKoDeYx1+QpdPcy71kuFbuhweD09a+tzI3jlAlI6bCDkUZdRrJbh58oh6Ko5I9zV8EBJtTtYUjOW3HlU4GB7jNQjtLbCQCRWijAI3Dkc+oo/R+y6/ncalZd6zEsocjCjjAxn0Iow3XZSfXW0G40OX8wmcvENwB27jkZ8h51olHpWHs9nIRFNaJI0keZPFk+Pw54x86iMceoMNiFFQAbtmD08s+dLIL7TopDaaGwezywSZifCG56H05qw217HEiiAr4FGN/JI9xQtJPJmBXd5+WlMUkPdxhAoXqzsOv96FV5lmiZi3dzNkbj8Ht7V5Sya51gq7grKSyE8fMUzGm3d6rRBQu7C/EeCTjj7GjcW2muCrB7PuDcSG7k27owwjRjnJOP5YyaivtPtpp+8tbpSjKM96uCD6Uyk0NLO4m/NOrpEcR5ON/Ht6ZoVO6i3COFHUnOTk/zNW9q6KyDwWckl0JpIkjPVcEn24r6S1mvSfzkIXDEhFAGffPrR6t3oCgMQQQQ3WuQWsrPlgQgHUHAJrBuwwZreRMGNEUEjdjGAPn69KDmvbiec25VML5befnx1p0kLAqruuM5BBGD7Y9qnh7OahqN3DcwlreHb4zKMbj7fT0qLJYuTtBPZw2lxeLlIwU37cFhkYLe+AOaOS50+/ln1LT7lbe+kRVMsAAkbn16EdM8Z4ortbb2FhaWqXskccewRFyvG4DjP2NZ9YWdhe67Bawtua4lCo8b+EH1wOo9a1jDNGyl42N9L0+w03vwZBLlyzFsDJHl8s/917DWsO5o5fGFUhhzjPlVp1rsZ/65JdOjlN6mAUVwVPqeaoV2Lu1M0E0LJKHHDrhlOcipL0xfl2P1mWzkUxOshDZbcv3IzTK17RXKQB7aOPayAICmdp9KRWu5rbvLhP1XyHyuD69PrU2nRkKzqgCLnavkWySCKpajXBVDe9mglkjTZcrKE/UZ4skHzPHr1+tDWst4UYWlmJIw5G5hgk12eG4vPHa3TRuVC3ErNu+Yx6HioGt7C3OLnT5rh28Xeb2GQflxWm1SdkPdqzAd7LKA7ccD4RREb3TlVVi/PhQLzn0+tBPMBMigIA/GT0J44HvVu7LW8cne3sqAPFIFj9AMc/XnrS6TbDGehaNa6XZqWhT8xjMj4yc9cZ8sD0p0oU8gClOs3i28ZQsVMgwmBnn/AEaOiuB3QO1hjjmt9jqyJ5K1+ImkNqmiyKjd33ciPkqDvPTbnPHXNUKz0mXTru1ulSNJLRlkz1Jw2ffyq8/iDrR07SIlki3mefaqK2CVAznn3xWev2mLpsfS7jGMbiy4x96Y0/67aii0odm4x7SNynhgCKrnbXSoZ7CTUBHmW3XL4ONyDk5+XWp9A1RbnszY3YDMWiVSFBOGHBBwOOlNVZH3RspZXyCr+nvS0o9MloymG/iKFmjAx5FcnA86nhuIp9zRyeBx1Uj/ADrX2vRw6dr1xbyB1jHhXw9Q3I+mPOkGnaiYLo91GHj3kAHjg/4ax2+gSwwyC3tZLNxLOhBKhAM7vI080m9tG0+EXAUug25fAJx86rhuZkikkttsaN8XHiHH9q8vZibbJDcHxKC3T4vOmIyjFIEg0DTmvtaihvbh1tkBYhf4sD4c+Xz9M1pU18thaqBaKkCLtXu23Kq+/AIHuM1RdOlj0u/E13hkk8AGPhHXdxWhWGq208A8aY6DHQ1IcWX8KveXg1nV7eKDvFitWHesRnDbhgf09as8FiIY9qTyiMZbaCAM9T5ZrsWk2KO0ttEIt7B2A+Eke3l1rr3USyS2rZZgoDNjw8+Xzxz9a0nqJpJEjBmbfi9dibVtOs1Rn7q3MhwV2jeceZ/4VRls88qjA/8ACXGPtir3+IFjbi4fUZLe+DEJCjju+4QKOMkEtzz5dTVMJRx+rwh5WMnGfdv7U5+enpqipJp5NO/CK9EuiT2RlEjW07DIbPDYPXJ9TTi31qE6/eWjNxET6BQR7k9etUv8Kbpou0F3AyhUngVlGOSVOMn7j7VYLXS437UXTtGpbvmkZjJtGc8HkHn/AHS2rUdRp9k6wS9urGDU9NivLe4SN7SVTISwO5CcYP1IP3qkS6ZG0gmt5tmWzjPUeVaT2zFtadnp5mhUyKAsZK5O4nFZ3bXs12Nk6IJJMhCFxwPWlJ/AgyJiGHeKGYeFxzyfWpDIigARyKMdFUVDAUjGwqquCRy3xc+WetEm5jPRl4460Ea7IK9Vcvdxuki7FxkbsHIqXT7m9srpHtjtY4OC24H5ivmt9PdHW4ZCpPhGQCMUTaRWx1G2ELvI7SDw8fPP2o1zg0awMz2i7QQSTCZbC5ts4RNjQvj0LAkf0ihTrOoRd/c6pAtrAzFhMpMkSj3bj74q7W2mRIu5kDHAqm/inqhfSLXT7Mvi4lJkUAoWWPjHl/ER9qZlGMsGUJOLso3aXtBPqtyqwCM2yncrLHs7w/Idcf4RS+JZQweflyeF/iNCNAm8qXuIpD12sx/nXUhnjfZHqZU//LMM/wA803pKMFSJJuTtl5/DyaVO08QePb3kZHXzUg/tmtUs7RF1O9vIy2ZducnjIHIxWP8AYKeaDXknvNRtTHGCqR4/UldvCFUA8nz6VrbavDAxhcDeQSGHQkdQfQ+dK/pacy4xdWV/t3eLObS2Uho0bvJQp8+gH71UY7QJOdke0ZycnPWnE96s91PdzEZk5yCD9MVxJjLiRERo2GQ46/akpPOCUJ5IYUMb3BPgORg9KmlVVYGCBGRhkE0RLCk7+EoWA4Ue9DLbSRDYsnA9cihIS3NpmOM3EKqqjBOCTJ7+30ovs7EqavC6Iiqqtt28nOK9XUjIAFPHSh/zktiyT2+BIp4YjNMLDsJ5Ro1rcF0yVIPQq3BrI+22pnUu01yRxFa/+PGGPp8X9RP2FaBZ3895Z2twxWNmc71QeFhsY4wc+YHSskad5Ve4YjvJGLtxxk8n961XsFHGRnjYRomcZ8LedejJdvEoAjXK9SAaUvdPJM3hRSAcMgwajsrma4EoeVlVP4UO3d8/OrsJDcPfIRtW3kI5wv6bj3FXiw1y0vdIkuNVWdbi3TYYo8BnJBAYY4x1z7/aqHpjgxkCNFGcYGac2q5VlBI3sFJHpQzXjZSZ6E8mpQIcsuwsdoJyRXbBryDMXeYRuqg4P0ppbWUcNxGqs+0nkEjmp3gRTtwWADAbuSB1pUKgK3vYIP0fGGC5IPPHNFPdtkGJ1dCMg4oOeFO+XjJCg5PU+x9ua8mPJxubA4HNUSj/2Q==";

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

const Article = ({ img, title, date, link }: TCommunity) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative w-full p-4 py-6 my-4 rounded-xl flex justify-between items-center bg-light text-dark first:mt-0 border border-solid border-dark border-r-4 border-b-4 dark:border-light dark:bg-dark sm:flex-col"
    >
      <div className="flex items-center justify-between  w-full">
        <MovingImage title={title} img={img} link={link} />
        <span className="text-primary font-semibold pl-4 dark:text-primaryDark sm:self-start sm:pl-0 xs:text-sm">
          {date}
        </span>
      </div>
    </motion.li>
  );
};

export default function Community() {
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
            <Article
              title="Silky Smooth Scrolling In Reactjs: A Step-By-Step Guide For React Developers"
              date="March 22, 2023"
              link="/"
              img={mypic}
            />
            <Article
              title="Silky Smooth Scrolling In Reactjs: A Step-By-Step Guide For React Developers"
              date="March 22, 2023"
              link="/"
              img={mypic}
            />
            <Article
              title="Silky Smooth Scrolling In Reactjs: A Step-By-Step Guide For React Developers"
              date="March 22, 2023"
              link="/"
              img={mypic}
            />
          </ul>
        </CommunityLayout>
      </main>
    </>
  );
}
