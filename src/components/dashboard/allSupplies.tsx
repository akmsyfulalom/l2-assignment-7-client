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
import SupplyEditModal from "./utils/supplyEditModal";
import SupplyDeleteModal from "./utils/supplyDelete";
import { CardTitle } from "../ui/card";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const AllSupply = () => {
  const { data: suppliers, isLoading } = useGetSupplierQuery(undefined);

  if (isLoading) {
    return (
      <div className="h-screen">
        <p className="flex justify-center items-center text-center">
          Loading suppliers...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10 mt-3 flex flex-col gap-5 md:flex-row md:justify-between items-center">
        <CardTitle>All Supply</CardTitle>
        <NavLink to="/dashboard/create-supply">
          <Button variant="outline">Create Supply</Button>
        </NavLink>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers?.data?.map((supply: any) => (
            <TableRow key={supply?.supply}>
              <TableCell className="font-medium">
                {supply?.title?.substring(0, 20)}
              </TableCell>
              <TableCell>{supply?.category}</TableCell>
              <TableCell>{supply?.amount}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center gap-3 justify-end">
                  <SupplyEditModal supply={supply} />

                  <SupplyDeleteModal supply={supply} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllSupply;
