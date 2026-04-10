import { useState } from 'react'
import { useFilter } from '../hooks/useFilter'
import ContextMenu from './ContextMenu'

export default function ExpenseTable({
  expenses,
  setExpense,
  setExpenses,
  setEditingRowId,
}) {
  const [filteredData, setQuery] = useFilter(expenses, (data) => data.category)
  const [menuPosition, setMenuPosition] = useState({})
  const [rowId, setRowId] = useState('')
  const [sortCallback, setSortCallback] = useState(() => () => {})

  const total = filteredData.reduce(
    (accumulator, current) => accumulator + parseInt(current.amount),
    0
  )
  const sortIconClass =
    'h-3.5 w-3.5 cursor-pointer text-slate-400 transition hover:text-slate-700'
  const headerCellClass =
    'px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 sm:px-6'

  return (
    <>
      <ContextMenu
        menuPosition={menuPosition}
        setExpense={setExpense}
        setMenuPosition={setMenuPosition}
        expenses={expenses}
        setExpenses={setExpenses}
        rowId={rowId}
        setEditingRowId={setEditingRowId}
      />
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.45)] backdrop-blur">
        <div className="border-b border-slate-200/80 px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Expense History
              </p>
              <h2 className="font-display text-2xl font-semibold text-slate-900">
                Review and organize entries
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-500">
              Sort by title or amount, filter by category, and right-click any
              row to edit or delete it.
            </p>
          </div>
        </div>

        <div
          className="overflow-x-auto"
          onClick={() => {
            if (menuPosition.left) {
              setMenuPosition({})
            }
          }}
        >
          <table className="expenses-grid min-w-[640px] w-full border-collapse text-left text-sm text-slate-700">
            <thead className="bg-slate-50/90">
              <tr>
                <th className={headerCellClass}>
                  <div className="flex items-center gap-3">
                    <span>Title</span>
                    <div className="ml-auto flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        fill="currentColor"
                        className={`${sortIconClass} hover:-translate-y-0.5`}
                        onClick={() => {
                          setSortCallback(
                            () => (a, b) => a.title.localeCompare(b.title)
                          )
                        }}
                      >
                        <title>Ascending</title>
                        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        fill="currentColor"
                        className={`${sortIconClass} hover:translate-y-0.5`}
                        onClick={() => {
                          setSortCallback(
                            () => (a, b) => b.title.localeCompare(a.title)
                          )
                        }}
                      >
                        <title>Descending</title>
                        <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                      </svg>
                    </div>
                  </div>
                </th>
                <th className={headerCellClass}>
                  <select
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold normal-case tracking-normal text-slate-700 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                  >
                    <option value="">All</option>
                    <option value="grocery">Grocery</option>
                    <option value="clothes">Clothes</option>
                    <option value="bills">Bills</option>
                    <option value="education">Education</option>
                    <option value="medicine">Medicine</option>
                  </select>
                </th>
                <th className={headerCellClass}>
                  <div className="flex items-center gap-3">
                    <span>Amount</span>
                    <div className="ml-auto flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        fill="currentColor"
                        className={`${sortIconClass} hover:-translate-y-0.5`}
                        onClick={() => {
                          setSortCallback(() => (a, b) => a.amount - b.amount)
                        }}
                      >
                        <title>Ascending</title>
                        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        fill="currentColor"
                        className={`${sortIconClass} hover:translate-y-0.5`}
                        onClick={() => {
                          setSortCallback(() => (a, b) => b.amount - a.amount)
                        }}
                      >
                        <title>Descending</title>
                        <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                      </svg>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
        <tbody>
          {filteredData
            .sort(sortCallback)
            .map(({ id, title, category, amount }) => (
              <tr
                key={id}
                onContextMenu={(e) => {
                  e.preventDefault()
                  setMenuPosition({ left: e.clientX + 4, top: e.clientY + 4 })
                  setRowId(id)
                }}
              >
                <td>{title}</td>
                <td>{category}</td>
                <td>₹{amount}</td>
              </tr>
            ))}
          <tr>
            <th>Total</th>
            <th
              className="clear-sort"
              onClick={() => {
                setSortCallback(() => () => {})
              }}
            >
              Clear Sort
            </th>
            <th>₹{total}</th>
          </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
