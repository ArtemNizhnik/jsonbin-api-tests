import { test, expect } from '../../src/fixtures/apiFixture';
import { BinController } from '../../src/controllers/BinController';

test.describe('POST /v3/b - Create Bin', () => {
  let binController: BinController;
  let createdBinId: string | null = null;

  test.beforeEach(async ({ apiContext }) => {
    binController = new BinController(apiContext);
    createdBinId = null;
  });

  test.afterEach(async () => {
    if (createdBinId) {
      await binController.deleteBin(createdBinId);
    }
  });

  test('should create bin with valid data', async () => {
    const response = await binController.createBin({
      name: 'Peter',
      diploma: true,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    createdBinId = body.metadata.id;

    expect(body.metadata).toHaveProperty('id');
  });

test('should return 400 when creating bin with empty object', async () => {
  const response = await binController.createBin({});

  expect(response.status()).toBe(400);
});

  test('should create bin with nested object', async () => {
    const response = await binController.createBin({
      user: {
        name: 'Peter',
        age: 30,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    createdBinId = body.metadata.id;

    expect(body.record.user.name).toBe('Peter');
  });

  test('should create bin with array data', async () => {
    const response = await binController.createBin({
      items: [1, 2, 3],
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    createdBinId = body.metadata.id;

    expect(body.record.items.length).toBe(3);
  });

  test('should create bin with large payload', async () => {
    const largeData = {
      text: 'A'.repeat(1000),
    };

    const response = await binController.createBin(largeData);

    expect(response.status()).toBe(200);

    const body = await response.json();
    createdBinId = body.metadata.id;

    expect(body.record.text.length).toBe(1000);
  });
});