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

const AllSuppliesCard = () => {
  const { data: suppliers, isLoading } = useGetSupplierQuery(undefined);

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
    </div>
  );
};

export default AllSuppliesCard;
