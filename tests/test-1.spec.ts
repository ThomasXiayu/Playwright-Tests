import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.frontlineinsurance.com/');
  await page.getByLabel('Our Products').getByRole('link', { name: 'Florida' }).click();
  await page.getByRole('link', { name: 'Contact Us' }).click();
  await page.getByText('First Name').click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('Thomas test');
  await page.getByRole('group').filter({ hasText: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Hall');
  await page.getByRole('combobox', { name: 'How Can We Help You?' }).click();
  await page.getByLabel('Homeowner Customer Service').getByText('Homeowner Customer Service').click();
});