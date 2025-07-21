import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.')
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const clearDisplay = () => {
    setDisplay('0')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand
      case '-':
        return firstOperand - secondOperand
      case '*':
        return firstOperand * secondOperand
      case '/':
        return firstOperand / secondOperand
      case '=':
        return secondOperand
      default:
        return secondOperand
    }
  }

  const handleEquals = () => {
    if (firstOperand === null || operator === null) {
      return
    }

    const inputValue = parseFloat(display)
    const result = calculate(firstOperand, inputValue, operator)
    setDisplay(String(result))
    setFirstOperand(result)
    setOperator(null)
    setWaitingForSecondOperand(true)
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardContent className="p-4">
        <div
          className="mb-4 p-4 bg-white border rounded-md text-right text-3xl font-mono h-16 flex items-center justify-end overflow-hidden"
          data-testid="calculator-display"
        >
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            onClick={clearDisplay}
            className="col-span-2"
            data-testid="button-clear"
          >
            AC
          </Button>
          <Button
            variant="outline"
            onClick={() => setDisplay(display.slice(0, -1) || '0')}
            data-testid="button-backspace"
          >
            ⌫
          </Button>
          <Button
            variant={operator === '/' ? "outline" : "secondary"}
            onClick={() => performOperation('/')}
            className={operator === '/' ? "ring-2 ring-blue-500" : ""}
            data-testid="button-divide"
          >
            ÷
          </Button>

          <Button variant="outline" onClick={() => inputDigit('7')} data-testid="button-7">
            7
          </Button>
          <Button variant="outline" onClick={() => inputDigit('8')} data-testid="button-8">
            8
          </Button>
          <Button variant="outline" onClick={() => inputDigit('9')} data-testid="button-9">
            9
          </Button>
          <Button
            variant={operator === '*' ? "outline" : "secondary"}
            onClick={() => performOperation('*')}
            className={operator === '*' ? "ring-2 ring-blue-500" : ""}
            data-testid="button-multiply"
          >
            ×
          </Button>

          <Button variant="outline" onClick={() => inputDigit('4')} data-testid="button-4">
            4
          </Button>
          <Button variant="outline" onClick={() => inputDigit('5')} data-testid="button-5">
            5
          </Button>
          <Button variant="outline" onClick={() => inputDigit('6')} data-testid="button-6">
            6
          </Button>
          <Button
            variant={operator === '-' ? "outline" : "secondary"}
            onClick={() => performOperation('-')}
            className={operator === '-' ? "ring-2 ring-blue-500" : ""}
            data-testid="button-subtract"
          >
            −
          </Button>

          <Button variant="outline" onClick={() => inputDigit('1')} data-testid="button-1">
            1
          </Button>
          <Button variant="outline" onClick={() => inputDigit('2')} data-testid="button-2">
            2
          </Button>
          <Button variant="outline" onClick={() => inputDigit('3')} data-testid="button-3">
            3
          </Button>
          <Button
            variant={operator === '+' ? "outline" : "secondary"}
            onClick={() => performOperation('+')}
            className={operator === '+' ? "ring-2 ring-blue-500" : ""}
            data-testid="button-add"
          >
            +
          </Button>

          <Button variant="outline" onClick={() => inputDigit('0')} className="col-span-2" data-testid="button-0">
            0
          </Button>
          <Button variant="outline" onClick={inputDecimal} data-testid="button-decimal">
            .
          </Button>
          <Button variant="default" onClick={handleEquals} className="bg-blue-500 text-white hover:bg-blue-600" data-testid="button-equals">
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
