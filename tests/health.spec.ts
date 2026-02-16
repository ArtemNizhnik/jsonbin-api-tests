import { test, expect } from '../src/fixtures/apiFixture';
import { BinController } from '../src/controllers/BinController';

test('API should create a bin successfully', async ({ apiContext }) => {
  const binController = new BinController(apiContext);

  const response = await binController.createBin({
    name: 'Peter',
    diploma: true,
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('metadata.id');
});
