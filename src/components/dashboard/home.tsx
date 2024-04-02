/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSupplierQuery } from "@/redux/features/supplier/supplierApi";
import { useAppSelector } from "@/redux/hooks";
import { Chart } from "react-google-charts";

export default function DashboardChart() {
  const { data: supplierData, isFetching } = useGetSupplierQuery(undefined);
  const { darkMode } = useAppSelector((store) => store.theme);

  const categoryAmounts = supplierData?.data?.reduce(
    (accumulator: { [category: string]: number }, suppliers: any) => {
      const { category, amount } = suppliers;
      accumulator[category] = (accumulator[category] || 0) + amount;
      return accumulator;
    },
    {} as { [category: string]: number }
  );

  if (categoryAmounts) {
    const data = Object.entries(categoryAmounts).map(([category, amount]) => [
      category,
      amount,
    ]);

    data.unshift(["Category", "Amount"]);

    const options = {
      title: "Suppliers Activities",
    };

    if (isFetching) {
      return (
        <div className="h-screen">
          <p className="text-center py-20">Loading...</p>
        </div>
      );
    }
    return (
      <div>
        <div>
          <Chart
            chartType="PieChart"
            data={data}
            options={{
              ...options,
              backgroundColor: `${darkMode ? "text-white" : ""}`,
            }}
            width={"100%"}
            height={"400px"}
            className={`${darkMode ? "text-white" : ""}`}
          />
        </div>
      </div>
    );
  }
}
