import { test, expect } from '@playwright/test';

/*
test('verified wikipedia title', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Wikipedia/);
});

test('select English link', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  // Click the get started link.
  await page.getByRole('link', { name: 'English' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Welcome to Wikipedia' })).toBeVisible();
});

test('search cats', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  // Click the get started link.
  await page.getByRole('link', { name: 'English' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Welcome to Wikipedia' })).toBeVisible();

  await page.getByRole('button', {name: 'Search'}).click();
  await page.getByLabel('', {exact: true}).click();
  await page.getByLabel('', {exact: true}).fill('cats');
  await page.keyboard.press('Enter');
});


test('click Cat option', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  // Click the get started link.
  await page.getByRole('link', { name: 'English' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Welcome to Wikipedia' })).toBeVisible();

  await page.getByRole('button', {name: 'Search'}).click();
  await page.getByLabel('', {exact: true}).click();
  await page.getByLabel('', {exact: true}).fill('cats');
  await page.keyboard.press('Enter');

  await page.getByRole('link', { name: 'Cat' }).nth(0).click();
});
*/

const subject = 'cats';

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
