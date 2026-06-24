import { test, expect } from '@playwright/test';

const subject = 'polar bear';

test('check domesticated', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  // Click the get started link.
  await page.getByRole('link', { name: 'English' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Welcome to Wikipedia' })).toBeVisible();

  await page.getByRole('button', {name: 'Search'}).nth(0).click();
  await page.getByLabel('', {exact: true}).click();
  await page.getByLabel('', {exact: true}).fill(subject);
  await page.keyboard.press('Enter');

  await page.getByRole('link', { name: subject }).nth(0).click();

  let domesticated = page.locator('.infobox.biota').getByText('Domesticated');
  if (await domesticated.isVisible())
  {
    console.log(subject, 'is domesticated');
  }
  else
  {
    console.log(subject, 'is not domesticated');
  }

});
