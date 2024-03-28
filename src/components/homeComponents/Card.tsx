/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetSixSupplyQuery } from "@/redux/features/supplier/supplierApi";
import { NavLink } from "react-router-dom";
import { motion } from 'framer-motion';

const Cards = () => {
  const { data: suppliers, isLoading } = useGetSixSupplyQuery(undefined);


 if (isLoading) {
  return (
    <div className="h-96">
      <p>Suppliers Loading...</p>
    </div>
  );
}
  return (
    
    <motion.div
    initial={{ y: 200 }}
    whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    viewport={{ once: true }}
    
    >
      <h2 className="text-2xl font-bold lg:text-4xl text-center my-20">
        Supply Posts
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 lg:gap-14 gap-4 md:mx-10  mx-5">
        {suppliers?.data?.map((data: any, index: any) => (
          <Card key={index} className="">
            <img
              src={data.image}
              alt={`Visual representation of ${data.title}`}
              className="w-full h-40 object-cover"
            />
            <CardHeader>
              <CardTitle>{data.title}</CardTitle>
              <CardDescription>Category: {data.category}</CardDescription>
              <CardDescription>Amount: {data.amount}</CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-between">
              <Button variant="outline"><NavLink to={`/supply/${data?._id}`}>View Detail</NavLink></Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-5 mb-10 text-center">
        <Button className="" size={"lg"}>
          <NavLink to={"/supplies"}>
          View All
          </NavLink>
        </Button>
      </div>
    </motion.div>
  );
};

export default Cards;
