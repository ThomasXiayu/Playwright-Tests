import { test, expect } from '@playwright/test';

test('recorded test', async ({ page }) => {
  await page.goto('https://www.frontlineinsurance.com/');
  await page.getByRole('link', { name: 'Read Stories' }).click();
  await page.getByRole('button', { name: 'Read article by Trace Meeks' }).click();
});