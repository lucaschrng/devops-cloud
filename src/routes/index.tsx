import { createFileRoute } from '@tanstack/react-router'
import Calculator from '@/components/Calculator'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-1 p-6 flex items-center justify-center">
        <Calculator />
      </main>
    </div>
  )
}
