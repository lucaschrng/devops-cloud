import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-1 p-6 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-center" data-testid="about-heading">About This Calculator</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <section>
                <h2 className="text-xl font-bold mb-2">Project Information</h2>
                <p>
                  This is a simple calculator application built with React, TanStack Router, and shadcn/ui components.
                  It demonstrates the use of modern web technologies in a practical application.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">Features</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Basic arithmetic operations (addition, subtraction, multiplication, division)</li>
                  <li>Clear and delete functionality</li>
                  <li>Visual feedback for selected operations</li>
                  <li>Responsive design with Tailwind CSS</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">Technologies Used</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>React</li>
                  <li>TypeScript</li>
                  <li>TanStack Router</li>
                  <li>shadcn/ui Components</li>
                  <li>Tailwind CSS</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">Purpose</h2>
                <p>
                  This application was created as a demonstration project for DevOps and cloud deployment practices.
                  It serves as a simple yet functional example that can be used to practice deployment pipelines,
                  containerization, and cloud hosting.
                </p>
              </section>
              
              <div className="mt-6 text-center">
                <a href="/" className="text-blue-500 hover:text-blue-700 font-medium" data-testid="back-to-calculator-link">
                  Back to Calculator
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
