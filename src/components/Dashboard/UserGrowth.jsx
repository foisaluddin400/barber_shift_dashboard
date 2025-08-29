import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetDasboardQuery } from "../../page/redux/api/manageApi";

const UserGrowth = () => {
  const { data: dashboardData } = useGetDasboardQuery();


  const customerGrowth = dashboardData?.data?.customerGrowth || [];


  const chartData = useMemo(() => {
    return customerGrowth.map((item) => ({
      name: item.month.split(" ")[0],
      value: item.count,
    }));
  }, [customerGrowth]);

  return (
    <div>
      <div className="flex justify-between p-3 ">
        <p className="text-xl font-medium">User Growth</p>
      </div>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={13}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="value"
              stackId="a"
              fill="#AB684D"
              radius={[25, 25, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGrowth;
