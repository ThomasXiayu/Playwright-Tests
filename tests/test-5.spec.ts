import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');
  await page.getByRole('link', { name: 'English 7,189,000+ articles' }).click();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByLabel('', { exact: true }).fill('Cats');
  await page.getByLabel('', { exact: true }).press('Enter');
  await page.getByLabel('', { exact: true }).press('Enter');
  await page.getByLabel('Search', { exact: true }).getByRole('button', { name: 'Search', exact: true }).click();
  await page.getByRole('link', { name: 'Cat' }).nth(2).click();
});