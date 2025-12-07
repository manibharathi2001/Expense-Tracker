import React from 'react'

const StatCard = ({ title, amount, icon, trend, color }) => {
  return (
    <div className={`bg-white rounded-2xl p-6 text-black relative overflow-hidden group cursor-pointer transition-all hover:scale-105 hover:shadow-2xl border border-gray-100`}>
      <div className='relative z-10'>
        <div className={`inline-flex p-3 rounded-xl mb-4 ${color === 'blue' ? 'bg-blue-100 text-blue-600' : color === 'green' ? 'bg-green-100 text-green-600' : color === 'red' ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'} group-hover:rotate-12 transition-all duration-300`}>
          {icon}
        </div>
        <h3 className='text-3xl lg:text-4xl font-bold mb-1'>{amount}</h3>
        <p className='text-sm opacity-90 font-medium text-gray-500'>{title}</p>
        {trend && <p className={`text-xs font-bold mt-1 ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{trend} from last month</p>}
      </div>
    </div>
  )
}

export default StatCard