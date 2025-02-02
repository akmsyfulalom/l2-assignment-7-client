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
import { motion } from "framer-motion";
import TransitionEffect from "@/utils/TransitionEffect";
import AnimatedText from "@/utils/AnimatedText";

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

  const sortedSuppliers = suppliers?.data
    ?.slice()
    .sort(
      (b: { amount: number }, a: { amount: number }) => a.amount - b.amount
    );

  return (
    <>
      <TransitionEffect />

      <motion.div
        initial={{ y: 200 }}
        whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="my-20">
          <AnimatedText
            text="Gratitude Corner: A Place for Appreciation"
            className="mb-16 lg:!text4xl sm:mb-8 sm:!text-2xl  !text-2xl"
          />
        </div>

        <Table className="mb-20">
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
            {sortedSuppliers?.map((supply: any, index: any) => (
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
      </motion.div>
    </>
  );
};

export default Leaderboard;
