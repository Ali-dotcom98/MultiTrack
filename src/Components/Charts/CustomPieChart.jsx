import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'

const CustomPieChart = ({ data, label, color }) => {
  return (
    <div >
      <ResponsiveContainer width="100%" height={325}>
        <PieChart>
          <Pie
            className='mt-3'
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((item, index) => (
              <Cell key={`cell-${index}`} fill={color[index % color.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip/>}/>
          <Legend content={<CustomLegend/>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomPieChart
