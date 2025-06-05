import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

const CustomBarChart = ({ data }) => {
    // Fixed priority strings (removed trailing spaces)
    const getBarColor = (priority) => {
        switch (priority) {
            case 'Low': return '#00bc7D'
            case 'Medium': return '#fe9900'
            case 'High': return '#ff1f57'
            default: return "#00bc7d"
        }
    }
    
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    <p className='text-xs font-semibold text-purple-800 mb-1'>{payload[0].payload.priority}</p>
                    <p className='text-sm text-gray-600'>
                        Count: {" "}
                        <span className='text-sm font-medium text-gray-900'>{payload[0].value}</span>
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div>
            <ResponsiveContainer width="100%" height={325}>
                <BarChart 
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                        dataKey="priority" 
                        tick={{ fontSize: 12, fill: "#555" }} 
                    />
                    <YAxis 
                        tick={{ fontSize: 12, fill: "#555" }} 
                        allowDecimals={false}
                    />
                    <Tooltip content={CustomTooltip} />
                    <Bar
                        dataKey="count"
                        name="Priority"
                        radius={[10, 10, 0, 0]}
                        activeDot={{r:8, fill:"yellow"}}
                        activeStyle={{fill : "green"}}
                    >
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={getBarColor(entry.priority)} 
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart