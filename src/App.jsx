import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import expenseData from "./expenseData";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [expense, setExpense] = useLocalStorage("expense", {
    title: "",
    category: "",
    amount: "",
  });
  const [expenses, setExpenses] = useLocalStorage("expenses", expenseData);
  const [editingRowId, setEditingRowId] = useLocalStorage("editingRowId", "");

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur sm:p-8 lg:p-10">
          <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-teal-300/30 blur-3xl" />
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-200/50 blur-3xl" />

          <div className="relative flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-3">
                <div className="space-y-3">
                  <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                    Track Your Expense
                  </h1>
                  <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                    A polished, cleaner dashboard for adding, editing,
                    filtering, and sorting expenses without changing how the app
                    behaves.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:max-w-sm">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Keep It Fast
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Create or update entries from the same form with the
                    existing workflow.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Stay Organized
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Sort by title or amount, filter by category, and manage rows
                    from the context menu.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(320px,380px)_minmax(0,1fr)]">
              <ExpenseForm
                setExpenses={setExpenses}
                expense={expense}
                setExpense={setExpense}
                editingRowId={editingRowId}
                setEditingRowId={setEditingRowId}
              />
              <ExpenseTable
                expenses={expenses}
                setExpense={setExpense}
                setExpenses={setExpenses}
                setEditingRowId={setEditingRowId}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
