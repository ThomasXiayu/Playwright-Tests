// Practice GET requests

import { test, expect } from '@playwright/test';
import fs from 'fs';

function getRandomNumber(min: number = 1, max: number = 1025): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const random_number = getRandomNumber();
const url_number = random_number.toString();

const link = 'https://pokeapi.co/api/v2/pokemon/'.concat(url_number);

test('basic GET request', async ({ request }) => {
  const response = await request.get(link);

  expect(response.status()).toBe(200);

  const data = await response.json();
  let name = data.name;

  let type1: string = '';
  let type2: string = '';
  // console.log(JSON.stringify(data, null, 1));

  for (let index = 0; index < data.types.length; index++)
  {
    if (index == 0)
    {
      type1 = data.types[0].type.name;
    }
    else if(index == 1)
    {
      type2 = data.types[1].type.name;
    }
  }

  fs.writeFileSync('./tests/responses/'.concat(name).concat('.json'), JSON.stringify(data, null, 2));
  console.log('\nPokemon:', name, '\nID:', random_number);
  console.log('Primary Type:', type1);

  if (type2 != '')
  {
    console.log('Primary Type:', type2);
  }
  else if (type2 == '')
  {
    console.log('Secondary Type: None');
  }

});
