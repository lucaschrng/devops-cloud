import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Calculator from '@/components/Calculator'

describe('Calculator Component', () => {
  beforeEach(() => {
    render(<Calculator />)
  })

  it('renders with initial display of 0', () => {
    const display = screen.getByTestId('calculator-display')
    expect(display).toHaveTextContent('0')
  })

  it('updates display when number buttons are clicked', () => {
    const display = screen.getByTestId('calculator-display')

    // Click on number 5
    fireEvent.click(screen.getByTestId('button-5'))
    expect(display).toHaveTextContent('5')

    // Click on number 3
    fireEvent.click(screen.getByTestId('button-3'))
    expect(display).toHaveTextContent('53')
  })

  it('performs addition correctly', () => {
    const display = screen.getByTestId('calculator-display')

    // Enter 5
    fireEvent.click(screen.getByTestId('button-5'))

    // Click +
    fireEvent.click(screen.getByTestId('button-add'))

    // Enter 3
    fireEvent.click(screen.getByTestId('button-3'))

    // Click =
    fireEvent.click(screen.getByTestId('button-equals'))

    // Check result is 8
    expect(display).toHaveTextContent('8')
  })

  it('performs subtraction correctly', () => {
    const display = screen.getByTestId('calculator-display')

    // Enter 9
    fireEvent.click(screen.getByTestId('button-9'))

    // Click -
    fireEvent.click(screen.getByTestId('button-subtract'))

    // Enter 4
    fireEvent.click(screen.getByTestId('button-4'))

    // Click =
    fireEvent.click(screen.getByTestId('button-equals'))

    // Check result is 5
    expect(display).toHaveTextContent('5')
  })

  it('performs multiplication correctly', () => {
    const display = screen.getByTestId('calculator-display')

    // Enter 6
    fireEvent.click(screen.getByTestId('button-6'))

    // Click ×
    fireEvent.click(screen.getByTestId('button-multiply'))

    // Enter 7
    fireEvent.click(screen.getByTestId('button-7'))

    // Click =
    fireEvent.click(screen.getByTestId('button-equals'))

    // Check result is 42
    expect(display).toHaveTextContent('42')
  })

  it('performs division correctly', () => {
    const display = screen.getByTestId('calculator-display')

    // Enter 8
    fireEvent.click(screen.getByTestId('button-8'))

    // Click ÷
    fireEvent.click(screen.getByTestId('button-divide'))

    // Enter 2
    fireEvent.click(screen.getByTestId('button-2'))

    // Click =
    fireEvent.click(screen.getByTestId('button-equals'))

    // Check result is 4
    expect(display).toHaveTextContent('4')
  })

  it('clears the display when AC button is clicked', () => {
    const display = screen.getByTestId('calculator-display')

    // Enter 123
    fireEvent.click(screen.getByTestId('button-1'))
    fireEvent.click(screen.getByTestId('button-2'))
    fireEvent.click(screen.getByTestId('button-3'))

    // Verify 123 is displayed
    expect(display).toHaveTextContent('123')

    // Click AC
    fireEvent.click(screen.getByTestId('button-clear'))

    // Check display is reset to 0
    expect(display).toHaveTextContent('0')
  })

  it('handles decimal points correctly', () => {
    const display = screen.getByTestId('calculator-display')

    // Enter 5
    fireEvent.click(screen.getByTestId('button-5'))

    // Click .
    fireEvent.click(screen.getByTestId('button-decimal'))

    // Enter 2
    fireEvent.click(screen.getByTestId('button-2'))

    // Check display shows 5.2
    expect(display).toHaveTextContent('5.2')
  })
})
