import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";

export default function Hero() {
  const { darkMode } = useAppSelector((store) => store.theme);
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden py-24 lg:py-32">
        <div className="relative z-10">
          <div className="container py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <p className="">
                Post-Disaster Community Health and Medical Supply Chain Platform
              </p>
              {/* Title */}
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  DCHM
                </h1>
              </div>
              {/* End Title */}
              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground">
                  "DCHM Platform: Innovating post-disaster healthcare logistics,
                  ensuring swift, efficient supply chain management for critical
                  medical resources, bolstering community health resilience in
                  crisis aftermaths."
                </p>
              </div>
              {/* Buttons */}
              <div className="mt-8 gap-3 flex justify-center">
                <Button size={"lg"}>Supply</Button>
                <Button size={"lg"} variant={"outline"} className={`${darkMode ?"text-black":""}`}>
                  Learn more
                </Button>
              </div>
              {/* End Buttons */}
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
