import React, { useState } from 'react'
import { Select } from 'antd'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserGrowth = () => {
  const [year, setYear] = useState("2023"); // default selected year
  const items = [
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' }
  ]; // options for Select

  const handleYearChange = (value) => {
    setYear(value); // updates year when user selects from dropdown
  };

  // Sample chart data (replace this with dynamic data if needed)
  const chartData = [
    { name: 'January', uv: 4000, pv: 2400 },
    { name: 'February', uv: 3000, pv: 1398 },
    { name: 'March', uv: 2000, pv: 9800 },
    { name: 'April', uv: 2780, pv: 3908 },
    { name: 'May', uv: 1890, pv: 4800 },
    { name: 'June', uv: 2390, pv: 3800 },
    { name: 'July', uv: 3490, pv: 4300 },
  ];

  return (
    <div>
      <div className=''>
        <div className="flex justify-between p-3 ">
          <p className="text-xl font-medium">User Growth</p>
          <Select
            defaultValue={year}
            onChange={handleYearChange}
            style={{ width: 120 }}
            options={items}
          />
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
              <Bar dataKey="uv" stackId="a" fill="#AB684D" radius={[25, 25, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default UserGrowth;
