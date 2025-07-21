import { expect, test } from '@playwright/test'

test.describe('Calculator Application', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the calculator page
    await page.goto('/')
  })

  test('should display the calculator', async ({ page }) => {
    // Check that the calculator is visible
    await expect(page.getByTestId('calculator-display')).toBeVisible()
    await expect(page.getByTestId('calculator-display')).toHaveText('0')
  })

  test('should perform basic addition', async ({ page }) => {
    // Click on number 7
    await page.getByTestId('button-7').click()
    
    // Click on + button
    await page.getByTestId('button-add').click()
    
    // Click on number 3
    await page.getByTestId('button-3').click()
    
    // Click on = button
    await page.getByTestId('button-equals').click()
    
    // Check that the result is 10
    await expect(page.getByTestId('calculator-display')).toHaveText('10')
  })

  test('should perform basic subtraction', async ({ page }) => {
    // Click on number 9
    await page.getByTestId('button-9').click()
    
    // Click on - button
    await page.getByTestId('button-subtract').click()
    
    // Click on number 4
    await page.getByTestId('button-4').click()
    
    // Click on = button
    await page.getByTestId('button-equals').click()
    
    // Check that the result is 5
    await expect(page.getByTestId('calculator-display')).toHaveText('5')
  })

  test('should perform basic multiplication', async ({ page }) => {
    // Click on number 6
    await page.getByTestId('button-6').click()
    
    // Click on × button
    await page.getByTestId('button-multiply').click()
    
    // Click on number 7
    await page.getByTestId('button-7').click()
    
    // Click on = button
    await page.getByTestId('button-equals').click()
    
    // Check that the result is 42
    await expect(page.getByTestId('calculator-display')).toHaveText('42')
  })

  test('should perform basic division', async ({ page }) => {
    // Click on number 8
    await page.getByTestId('button-8').click()
    
    // Click on ÷ button
    await page.getByTestId('button-divide').click()
    
    // Click on number 2
    await page.getByTestId('button-2').click()
    
    // Click on = button
    await page.getByTestId('button-equals').click()
    
    // Check that the result is 4
    await expect(page.getByTestId('calculator-display')).toHaveText('4')
  })

  test('should clear the display when AC is clicked', async ({ page }) => {
    // Enter 123
    await page.getByTestId('button-1').click()
    await page.getByTestId('button-2').click()
    await page.getByTestId('button-3').click()
    
    // Verify 123 is displayed
    await expect(page.getByTestId('calculator-display')).toHaveText('123')
    
    // Click AC
    await page.getByTestId('button-clear').click()
    
    // Check display is reset to 0
    await expect(page.getByTestId('calculator-display')).toHaveText('0')
  })

  test('should navigate to About page and back', async ({ page }) => {
    // Check that we're on the calculator page
    await expect(page.getByTestId('calculator-display')).toBeVisible()
    
    // Click on About link
    await page.getByTestId('about-link').click()
    
    // Check that we're on the About page
    await expect(page.getByTestId('about-heading')).toBeVisible()
    
    // Click on Back to Calculator link
    await page.getByTestId('back-to-calculator-link').click()
    
    // Check that we're back on the calculator page
    await expect(page.getByTestId('calculator-display')).toBeVisible()
  })
})
