export default function ContextMenu({
  menuPosition,
  setMenuPosition,
  setExpenses,
  setExpense,
  expenses,
  setEditingRowId,
  rowId,
}) {
  if (!menuPosition.left) return null

  return (
    <div
      className="fixed z-50 min-w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-1 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)] backdrop-blur"
      style={{ ...menuPosition }}
    >
      <div
        className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
        onClick={() => {
          const { title, category, amount } = expenses.find(
            (expense) => expense.id === rowId
          )
          setEditingRowId(rowId)
          setExpense({ title, category, amount })
          setMenuPosition({})
        }}
      >
        Edit
      </div>
      <div
        className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
        onClick={() => {
          setExpenses((prevState) =>
            prevState.filter((expense) => expense.id !== rowId)
          )
          setMenuPosition({})
        }}
      >
        Delete
      </div>
    </div>
  )
}
