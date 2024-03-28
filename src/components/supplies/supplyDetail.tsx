import { useGetSingleSupplyQuery } from "@/redux/features/supplier/supplierApi";

import { useParams } from "react-router-dom";

const SupplyDetail = () => {

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
            <h1 className="text-2xl md:text-3xl text-primary  font-bold mt-10 mb-4">
              {supply?.data?.title}
            </h1>
            <h3 className="md:text-lg font-semibold  mb-2">
              <span className="text-primary ">Category : </span>
              {supply?.data?.category}
            </h3>
            <h4 className="md:text-lg font-semibold  mb-10">
              {" "}
              <span className="text-primary ">Amount : </span>
              {`$${supply?.data?.amount}`}
            </h4>
            <div className="text-slate-700 dark:text-slate-400">
              <p className="text-lg md:text-xl text-primary font-semibold mb-2 ">
                Description :
              </p>
              <p>{supply?.data?.description}</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SupplyDetail;
