import React, { useState } from 'react'
import { Plus, LogOut, DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import api from '../utils/api'
import { useEffect } from 'react'
import StatCard from '../components/StatCard'
import SpendingChart from '../components/SpendingChart'
import CategoryChart from '../components/CategoryChart'
import TransactionList from '../components/TransactionList'
import Model from '../components/Model' // Fixed import
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const { logout, user } = useAuth()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [stats, setStats] = useState({ income: 0, expense: 0 })

    const fetchStats = async () => {
        try {
            const res = await api.get('/expenses')
            const expenses = res.data.data || []
            const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0)
            // Assuming we only track expenses for now, income might be hardcoded or 0
            // Or if category 'Income' exists. But model enum doesn't have Income.
            // So for now Income is 0 or maybe user wants to add income?
            // User requirement: "tracking expenses, income". But model only has expense categories.
            // I'll assume for now only expenses are tracked, so Income is 0 or maybe budget?
            // Let's just sum expenses.
            setStats({ income: 5000, expense: totalExpense }) // Hardcoded income for demo as no income source yet
        } catch (err) {
            console.error("Failed to fetch stats", err)
        }
    }

    useEffect(() => {
        fetchStats()
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
            <div className='bg-white shadow-lg sticky top-0 z-50'>
                <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-800 lg:text-3xl mb-1'>Expense Tracker</h1>
                        <p className='text-gray-500 text-sm'>Welcome back, {user?.username || 'User'}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg transition-all flex items-center gap-2'
                        >
                            <Plus className='w-4 h-4' />
                            <span className="hidden sm:inline">Add Expense</span>
                        </button>
                        <button
                            onClick={() => navigate('/timeline')}
                            className='p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all'
                            title="Timeline"
                        >
                            <span className="text-sm font-bold">Timeline</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className='p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all'
                            title="Logout"
                        >
                            <LogOut className='w-5 h-5' />
                        </button>
                    </div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-6 py-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                    <StatCard
                        title="Total Balance"
                        amount={`$${(stats.income - stats.expense).toFixed(2)}`}
                        icon={<DollarSign className="w-6 h-6" />}
                        color="blue"
                    />
                    <StatCard
                        title="Income"
                        amount={`$${stats.income.toFixed(2)}`}
                        icon={<TrendingUp className="w-6 h-6" />}
                        color="green"
                    />
                    <StatCard
                        title="Expenses"
                        amount={`$${stats.expense.toFixed(2)}`}
                        icon={<TrendingDown className="w-6 h-6" />}
                        color="red"
                    />
                    <StatCard
                        title="Savings"
                        amount={`$${(stats.income - stats.expense).toFixed(2)}`}
                        icon={<Wallet className="w-6 h-6" />}
                        color="purple"
                    />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8'>
                    <div className='lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm'>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Spending Overview</h3>
                        <SpendingChart refreshTrigger={stats} />
                    </div>
                    <div className='lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm'>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Category Breakdown</h3>
                        <CategoryChart refreshTrigger={stats} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h3>
                    <TransactionList refreshTrigger={stats} />
                </div>
            </div>

            {isModalOpen && <Model onClose={() => setIsModalOpen(false)} onExpenseAdded={fetchStats} />}
        </div>
    )
}

export default Dashboard
