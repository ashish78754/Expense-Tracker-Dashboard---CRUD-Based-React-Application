import { useState } from 'react'
import Input from './Input'
import Select from './Select'

export default function ExpenseForm({
  expense,
  setExpense,
  setExpenses,
  editingRowId,
  setEditingRowId,
}) {
  const [errors, setErrors] = useState({})

  const validationConfig = {
    title: [
      { required: true, message: 'Please enter title' },
      { minLength: 2, message: 'Title should be at least 2 characters long' },
    ],
    category: [{ required: true, message: 'Please select a category' }],
    amount: [
      {
        required: true,
        message: 'Please enter an amount',
      },
      {
        pattern: /^[1-9]\d*(\.\d+)?$/,
        message: 'Please enter a valid number',
      },
    ],
  }

  const validate = (formData) => {
    const errorsData = {}

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message
          return true
        }

        if (rule.minLength && value.length < rule.minLength) {
          errorsData[key] = rule.message
          return true
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message
          return true
        }
      })
    })

    setErrors(errorsData)
    return errorsData
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validateResult = validate(expense)

    if (Object.keys(validateResult).length) return

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId }
          }
          return prevExpense
        })
      )
      setExpense({
        title: '',
        category: '',
        amount: '',
      })
      setEditingRowId('')
      return
    }

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ])
    setExpense({
      title: '',
      category: '',
      amount: '',
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setErrors({})
  }

  return (
    <form
      className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.45)] backdrop-blur sm:p-7"
      onSubmit={handleSubmit}
    >
      <div className="mb-6 space-y-3">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Expense Form
        </span>
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-semibold text-slate-900">
            {editingRowId ? 'Edit expense' : 'Add an expense'}
          </h2>
          <p className="text-sm leading-6 text-slate-500">
            {editingRowId
              ? 'Update the selected entry and save it back into your expense list.'
              : 'Enter the details below to add a new expense to the tracker.'}
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <Input
          label="Title"
          id="title"
          name="title"
          value={expense.title}
          onChange={handleChange}
          error={errors.title}
        />
        <Select
          label="Category"
          id="category"
          name="category"
          value={expense.category}
          onChange={handleChange}
          options={['Grocery', 'Clothes', 'Bills', 'Education', 'Medicine']}
          defaultOption="Select Category"
          error={errors.category}
        />
        <Input
          label="Amount"
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          error={errors.amount}
        />
      </div>

      <button
        className={`mt-2 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 ${
          editingRowId
            ? 'bg-slate-900 focus:ring-slate-300'
            : 'bg-teal-600 focus:ring-teal-200'
        }`}
      >
        {editingRowId ? 'Save' : 'Add'}
      </button>
    </form>
  )
}
