export default function Input({ label, id, name, value, onChange, error }) {
  const hasError = Boolean(error)

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700" htmlFor={id}>
        {label}
      </label>
      <input
        className={`h-12 rounded-2xl border px-4 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 ${
          hasError
            ? 'border-rose-300 bg-rose-50/70 focus:border-rose-400 focus:ring-4 focus:ring-rose-100'
            : 'border-slate-200 bg-slate-50/90 focus:border-teal-400 focus:ring-4 focus:ring-teal-100'
        }`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <p className="min-h-5 text-xs font-medium text-rose-500">{error}</p>
    </div>
  )
}
