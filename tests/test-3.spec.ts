import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.frontlineinsurance.com/products/florida');
  await page.getByRole('link', { name: 'Find an agent', exact: true }).click();
  await page.getByRole('textbox', { name: 'Zip Code' }).click();
  await page.getByRole('textbox', { name: 'Zip Code' }).fill('7878');
});