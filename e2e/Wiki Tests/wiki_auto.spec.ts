import { test, expect } from '@playwright/test';
import fs from 'fs';
import * as XLSX from 'xlsx';

const workbook = XLSX.readFile('./datalines/animallist.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const animals: any[] = XLSX.utils.sheet_to_json(worksheet); // turns xlsx file to JSON format

const column_target = "Animal_Long";

fs.writeFileSync('./tests/responses/results.txt', '');  // clears the file first

animals.forEach((row, index) => 
{

  // makes it so it only tests the rows that have an entry in the column
  if(!row[column_target])
  {
    return;
  }

  //console.log(`Searching for ${row.Animal} (${index})`);
  test(`Test for ${row[column_target]} (${index})`, async ({ page }) => 
  {

    const subject = row[column_target]; //target the excel column by replacing "row.[excel header title]"

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

    let extinct = page.locator('.infobox.biota').getByText('Extinct');
    let extinct_wild = page.locator('.infobox.biota').getByText('Extinct in the Wild');
    let con_dep = page.locator('.infobox.biota').getByText('Conservation Dependent');
    let least_con = page.locator('.infobox.biota').getByText('Least Concern');
    let data_def = page.locator('.infobox.biota').getByText('Data Deficient');
    let not_eval = page.locator('.infobox.biota').getByText('Not Evaluated');
    let domesticated = page.locator('.infobox.biota').getByText('Domesticated');
    let vulnerable = page.locator('.infobox.biota').getByText('Vulnerable');
    let endangered = page.locator('.infobox.biota').getByText('Endangered');
    let crit_endangered = page.locator('.infobox.biota').getByText('Critically Endangered');
    let near_threatened = page.locator('.infobox.biota').getByText('Near Threatened');

    if (await domesticated.nth(0).isVisible())
      {
        var msg = `${subject} is domesticated`;
        console.log(msg);
      }
    else if (await extinct.nth(0).isVisible())
      {
        var msg = `${subject} is extinct`;
        console.log(msg);
      }
    else if (await extinct_wild.nth(0).isVisible())
      {
        var msg = `${subject} is extinct in the wild`;
        console.log(msg);
      }
    else if (await con_dep.nth(0).isVisible())
      {
        var msg = `${subject} is conservation dependent`;
        console.log(msg);
      }
    else if (await least_con.nth(0).isVisible())
      {
        var msg = `${subject} is least concern`;
        console.log(msg);
      }
    else if (await data_def.nth(0).isVisible())
      {
        var msg = `${subject} is data deficient`;
        console.log(msg);
      }
    else if (await not_eval.nth(0).isVisible())
      {
        var msg = `${subject} is not evaluated`;
        console.log(msg);
      }
    else if (await vulnerable.nth(0).isVisible())
      {
        var msg = `${subject} is vulnerable`;
        console.log(msg);
      }
    else if (await endangered.nth(0).isVisible())
      {
        var msg = `${subject} is endangered`;
        console.log(msg);
      }
    else if (await crit_endangered.nth(0).isVisible())
      {
        var msg = `${subject} is critically endangered`;
        console.log(msg);
      }
    else if (await near_threatened.nth(0).isVisible())
      {
        var msg = `${subject} is near threatened`;
        console.log(msg);
      }
    else
      {
        var msg = `${subject} has no conservation status (likely abundant/no threat)`;
        console.log(msg);
      }

    fs.appendFileSync('./tests/responses/results.txt', msg + '\n');

  });
});
