/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetSupplierQuery } from "@/redux/features/supplier/supplierApi";
import { CardTitle } from "../ui/card";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const Leaderboard = () => {
  const { data: suppliers, isLoading } = useGetSupplierQuery(undefined);

  if (isLoading) {
    return (
      <div className="h-screen">
        <p className="flex justify-center items-center text-center">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <CardTitle className="my-20 mx-[10px] lg:mx-[20px]">All Supply</CardTitle>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Serial</TableHead>
            <TableHead className="">Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Attach</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers?.data?.map((supply: any, index: any) => (
            <TableRow key={supply?.index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                {supply?.title?.substring(0, 20)}
              </TableCell>
              <TableCell>{supply?.category}</TableCell>
              <TableCell>{supply?.amount}</TableCell>
              
              <TableCell className="text-right flex  justify-end">
                <img className="max-w-[100px]" src={supply?.image} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard;
