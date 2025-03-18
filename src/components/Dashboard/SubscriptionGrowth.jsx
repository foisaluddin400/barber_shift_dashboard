import { Select } from 'antd';
import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = {
  2024: [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 150 },
    { month: 'Mar', value: 200 },
    { month: 'Apr', value: 250 },
    { month: 'May', value: 300 },
    { month: 'Jun', value: 350 },
    { month: 'Jul', value: 400 },
    { month: 'Aug', value: 450 },
    { month: 'Sep', value: 500 },
    { month: 'Oct', value: 550 },
    { month: 'Nov', value: 600 },
    { month: 'Dec', value: 650 },
  ],
  2023: [
    { month: 'Jan', value: 90 },
    { month: 'Feb', value: 140 },
    { month: 'Mar', value: 190 },
    { month: 'Apr', value: 240 },
    { month: 'May', value: 290 },
    { month: 'Jun', value: 340 },
    { month: 'Jul', value: 390 },
    { month: 'Aug', value: 440 },
    { month: 'Sep', value: 490 },
    { month: 'Oct', value: 540 },
    { month: 'Nov', value: 590 },
    { month: 'Dec', value: 640 },
  ],
  2022: [
    { month: 'Jan', value: 80 },
    { month: 'Feb', value: 130 },
    { month: 'Mar', value: 180 },
    { month: 'Apr', value: 230 },
    { month: 'May', value: 280 },
    { month: 'Jun', value: 330 },
    { month: 'Jul', value: 380 },
    { month: 'Aug', value: 430 },
    { month: 'Sep', value: 480 },
    { month: 'Oct', value: 530 },
    { month: 'Nov', value: 580 },
    { month: 'Dec', value: 630 },
  ]
};

export const SubscriptionGrowth = () => {
  const [year, setYear] = useState("2024"); // default selected year

  const handleYearChange = (value) => {
    setYear(value); // updates year when user selects from dropdown
  };

  const items = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' }
  ]; // options for Select

  return (
    <div>
      <div className="flex justify-between p-3">
        <p className="text-xl font-medium">Subscription Growth</p>
        <Select
          value={year}
          onChange={handleYearChange}
          style={{ width: 120 }}
          options={items}
        />
      </div>
      
      <ResponsiveContainer width="95%" height={300}>
        <AreaChart
          data={data[year]} 
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
          <Area
            type="monotone"
            dataKey="value"
            stroke="#AB684D"
            fill="#AB684D"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
