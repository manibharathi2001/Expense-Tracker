import React, { useEffect, useState } from 'react'
import { Search, Filter, ArrowUpRight, ArrowDownLeft, Trash2 } from 'lucide-react'
import api from '../utils/api'

const TransactionList = ({ refreshTrigger }) => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/expenses')
      setTransactions(res.data.data || [])
    } catch (err) {
      console.error("Failed to fetch transactions", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [refreshTrigger])

  // Listen for updates (this is a simple way, better would be context or query client)
  // For now, I'll just rely on parent passing a refresh trigger or just local state.
  // Actually, Dashboard should probably manage the state and pass it down, but for now let's keep it self-contained
  // and maybe expose a refresh method or use a global event.
  // Or better, I'll just leave it as is and maybe add a refresh button?
  // The user requirement says "CRUD operations on expenses", so adding should update list.
  // I'll make Dashboard handle the refresh.

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.delete(`/expenses/${id}`)
        setTransactions(transactions.filter(t => t._id !== id))
      } catch (err) {
        alert('Failed to delete expense')
      }
    }
  }

  const filteredTransactions = transactions.filter(t => {
    const title = t.description || ''; // Backend 'description' is UI 'title'
    const notes = t.notes || ''; // Backend 'notes' is UI 'description'

    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="text-center py-10">Loading transactions...</div>

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row gap-4 justify-between mb-6'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
          <input
            type="text"
            placeholder='Search transactions...'
            className='w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='flex gap-2'>
          <select
            className='px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-600'
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className='space-y-3'>
        {filteredTransactions.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No transactions found.</p>
        ) : (
          filteredTransactions.map((transaction) => (
            <div key={transaction._id} className='group flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100'>
              <div className='flex items-center gap-4'>
                <div className={`p-3 rounded-xl ${transaction.amount > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {/* Assuming expenses are positive numbers but logically "expense" is outflow. 
                      If we had income, we'd check type. For now assuming all are expenses. */}
                  <ArrowUpRight className='w-6 h-6' />
                </div>
                <div>
                  <h4 className='font-bold text-gray-800'>{transaction.description}</h4>
                  <p className='text-xs text-gray-500'>{new Date(transaction.date).toLocaleDateString()} • {transaction.category}</p>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <span className='font-bold text-red-600'>-${transaction.amount}</span>
                <button
                  onClick={() => handleDelete(transaction._id)}
                  className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all'
                >
                  <Trash2 className='w-4 h-4' />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TransactionList
