import { test, expect } from '@playwright/test';

import * as XLSX from 'xlsx';

const workbook = XLSX.readFile('./datalines/animallist.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const animals: any[] = XLSX.utils.sheet_to_json(worksheet);

// const subject = 'bee';

animals.forEach((row, index) => 
{

  console.log(`Searching for ${row.Animal} (${index})`);
  test(`Test for ${row.Animal} (${index})`, async ({ page }) => 
  {

    const subject = row.Animal;

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
});

