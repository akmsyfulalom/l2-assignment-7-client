import { useGetSingleSupplyQuery } from "@/redux/features/supplier/supplierApi";
import { useAppSelector } from "@/redux/hooks";

import { Link, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const SupplyDetail = () => {
  const { darkMode } = useAppSelector((store) => store.theme);
  const { id } = useParams();
  const { data: supply, isLoading } = useGetSingleSupplyQuery(id);

  if (isLoading) {
    return (
      <div className="h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link
                  to="/supplies"
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : ""
                  }`}
                >
                  Suppliers
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link
                  to="#"
                  className={`text-xl font-semibold ${
                    darkMode ? "text-gray-400" : ""
                  }`}
                >
                  Supply Detail
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className={` min-h-screen w-full`}>
        <div className="py-20 w-[95%] mx-auto">
          <div className="w-[95%] lg:w-full mx-auto">
            <div>
              <img
                className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
                src={supply?.data?.image}
                alt=""
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl   font-bold mt-10 mb-4">
                {supply?.data?.title}
              </h1>
              <h3 className="md:text-lg font-semibold  mb-2">
                <span className=" ">Category : </span>
                {supply?.data?.category}
              </h3>
              <h4 className="md:text-lg font-semibold  mb-10">
                {" "}
                <span className=" ">Amount : </span>
                {`$${supply?.data?.amount}`}
              </h4>
              <div className="">
                <p className="text-lg md:text-xl  font-semibold mb-2 ">
                  Description :
                </p>
                <p>{supply?.data?.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 ">
          <Link to="/supplies">
            <Button
              variant="secondary"
              className={`bg-gray-100 text-black ${
                darkMode ? "bg-gray-600 text-white" : ""
              }`}
            >
              Back to Supply
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SupplyDetail;
