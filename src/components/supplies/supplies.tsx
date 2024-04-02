/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetSupplierQuery } from "@/redux/features/supplier/supplierApi";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";

const AllSuppliesCard = () => {
  const { data: suppliers, isLoading } = useGetSupplierQuery(undefined);
  const { darkMode } = useAppSelector((store) => store.theme);

  if (isLoading) {
    return (
      <div className="h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="mb-20">
      <h2 className="text-2xl font-bold lg:text-4xl text-center my-20">
        Supply Posts
      </h2>
      <motion.div
        initial={{ y: 200 }}
        whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 lg:gap-14 gap-4 md:mx-10  mx-5"
      >
        {suppliers?.data?.map((data: any, index: any) => (
          <Card
            key={index}
            className={`${
              darkMode ? "bg-[#18191A] text-white  border-gray-600" : ""
            }`}
          >
            <img
              src={data.image}
              alt={`Visual representation of ${data.title}`}
              className="w-full h-40 object-cover"
            />
            <CardHeader>
              <CardTitle>{data.title}</CardTitle>
              <CardDescription
                className={`pt-2 ${darkMode ? "text-gray-400" : ""}`}
              >
                Category: {data.category}
              </CardDescription>
              <CardDescription className={`${darkMode ? "text-gray-400" : ""}`}>
                Amount: {data.amount}
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                className={`bg-white ${
                  darkMode ? "bg-[#101729] border-gray-600" : ""
                }`}
              >
                <NavLink to={`/supply/${data?._id}`}>View Detail</NavLink>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export default AllSuppliesCard;
