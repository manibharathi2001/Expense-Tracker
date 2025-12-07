import React, { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import api from '../utils/api'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const CategoryChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/expenses');
                const expenses = res.data.data || [];

                // Group by category
                const categoryMap = {};
                expenses.forEach(e => {
                    if (categoryMap[e.category]) {
                        categoryMap[e.category] += Number(e.amount);
                    } else {
                        categoryMap[e.category] = Number(e.amount);
                    }
                });

                const chartData = Object.keys(categoryMap).map((cat, index) => ({
                    name: cat,
                    value: categoryMap[cat],
                    color: COLORS[index % COLORS.length]
                }));

                setData(chartData);
            } catch (err) {
                console.error("Failed to fetch category data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>;

    return (
        <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full'>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Category Distribution</h3>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CategoryChart