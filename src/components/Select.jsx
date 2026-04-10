export default function Select({
  label,
  id,
  name,
  value,
  onChange,
  options,
  defaultOption,
  error,
}) {
  const hasError = Boolean(error)

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700" htmlFor={id}>
        {label}
      </label>
      <select
        className={`h-12 rounded-2xl border px-4 text-[15px] text-slate-900 outline-none transition ${
          hasError
            ? 'border-rose-300 bg-rose-50/70 focus:border-rose-400 focus:ring-4 focus:ring-rose-100'
            : 'border-slate-200 bg-slate-50/90 focus:border-teal-400 focus:ring-4 focus:ring-teal-100'
        }`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        {defaultOption && (
          <option value="" hidden>
            {defaultOption}
          </option>
        )}
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p className="min-h-5 text-xs font-medium text-rose-500">{error}</p>
    </div>
  )
}
