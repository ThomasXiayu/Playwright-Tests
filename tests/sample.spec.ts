import { test, expect } from '@playwright/test';

test('verified bulbapedia title', async ({ page }) => {
  await page.goto('https://bulbapedia.bulbagarden.net/wiki/Main_Page');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Bulbapedia/);
});

test('select current events', async ({ page }) => {
  await page.goto('https://bulbapedia.bulbagarden.net/wiki/Main_Page');

  // Click the get started link.
  await page.getByRole('link', { name: 'Browse:Current Events' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Current events' })).toBeVisible();
});