import { test, expect } from '@playwright/test';

let link = 'https://www.frontlineinsurance.com/'

test('has title', async ({ page }) => {
  await page.goto(link);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Frontline/);
});

test('get started link', async ({ page }) => {
  await page.goto(link);

  // Click the get started link.
  await page.getByRole('link', { name: 'Read Stories' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Frontline Stories' })).toBeVisible();
});