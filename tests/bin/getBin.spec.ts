import { test, expect } from '../../src/fixtures/apiFixture';
import { BinController } from '../../src/controllers/BinController';

test.describe('GET /v3/b/{id} - Get Bin', () => {
  let binController: BinController;
  let createdBinId: string;

  test.beforeEach(async ({ apiContext }) => {
    binController = new BinController(apiContext);

    const response = await binController.createBin({
      name: 'Peter',
      diploma: true,
    });

    const body = await response.json();
    createdBinId = body.metadata.id;
  });

  test.afterEach(async () => {
    await binController.deleteBin(createdBinId);
  });

  test('should get existing bin', async () => {
    const response = await binController.getBin(createdBinId);

    expect(response.status()).toBe(200);
  });

  test('should return correct metadata structure', async () => {
    const response = await binController.getBin(createdBinId);
    const body = await response.json();

    expect(body).toHaveProperty('metadata');
    expect(body.metadata).toHaveProperty('id');
  });

  test('should return correct record data', async () => {
    const response = await binController.getBin(createdBinId);
    const body = await response.json();

    expect(body.record.name).toBe('Peter');
    expect(body.record.diploma).toBe(true);
  });

  test('should return 404 for non-existing bin', async () => {
    const response = await binController.getBin('65aaaaaaaaaaaaaaaaaaaaaa');

    expect(response.status()).toBe(404);
  });

  test('should return error for invalid id format', async () => {
    const response = await binController.getBin('invalid-id');

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});