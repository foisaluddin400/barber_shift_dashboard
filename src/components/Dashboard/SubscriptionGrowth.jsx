import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useGetDasboardQuery } from "../../page/redux/api/manageApi";

export const SubscriptionGrowth = () => {
  const { data: dashboardData } = useGetDasboardQuery();


  const earningGrowth = dashboardData?.data?.earningGrowth || [];

 
  const chartData = useMemo(() => {
    return earningGrowth.map((item) => ({
      month: item.month.split(" ")[0], 
      value: item.amount,
    }));
  }, [earningGrowth]);

  return (
    <div>
      <div className="flex justify-between p-3">
        <p className="text-xl font-medium">Earning Growth</p>
      </div>

      <ResponsiveContainer width="95%" height={300}>
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#AB684D" fill="#AB684D" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
