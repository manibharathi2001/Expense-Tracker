import React, { useState } from 'react'
import { DollarSign, X, Calendar, Tag, FileText } from 'lucide-react'
import api from '../utils/api'

const Model = ({ onClose, onExpenseAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Food',
        description: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'HealthCare', 'Others']

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await api.post('/expenses', formData)
            if (onExpenseAdded) onExpenseAdded()
            onClose()
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add expense')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all'>
            <div className='bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl transform transition-all scale-100'>
                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <h2 className='text-2xl font-bold text-gray-900'>Add Expense</h2>
                        <p className='text-sm text-gray-500 mt-1'>Track your spending</p>
                    </div>
                    <button onClick={onClose} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                        <X className='w-6 h-6 text-gray-500' />
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label className='block text-sm font-bold text-gray-700 mb-2'>What did you buy?</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className='w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all'
                            placeholder='e.g., Grocery shopping'
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-bold text-gray-700 mb-2'>Amount</label>
                            <div className='relative'>
                                <DollarSign className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' />
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                    placeholder='0.00'
                                    className='w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all'
                                />
                            </div>
                        </div>
                        <div>
                            <label className='block text-sm font-bold text-gray-700 mb-2'>Date</label>
                            <div className='relative'>
                                <Calendar className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' />
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className='w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all'
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className='block text-sm font-bold text-gray-700 mb-2'>Category</label>
                        <div className='grid grid-cols-3 sm:grid-cols-4 gap-2'>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: cat })}
                                    className={`p-2 rounded-xl text-xs font-bold transition-all border-2 ${formData.category === cat
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                        : 'bg-white text-gray-600 border-gray-100 hover:border-blue-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className='block text-sm font-bold text-gray-700 mb-2'>Note (optional)</label>
                        <div className='relative'>
                            <FileText className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' />
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder='Add notes..'
                                className='w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all min-h-[100px] resize-none'
                            />
                        </div>
                    </div>

                    <div className='flex gap-3 pt-2'>
                        <button
                            type="submit"
                            disabled={loading}
                            className='flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {loading ? 'Adding...' : 'Add Expense'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className='flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-all'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Model