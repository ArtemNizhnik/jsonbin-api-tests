import { test, expect } from '../../src/fixtures/apiFixture';
import { BinController } from '../../src/controllers/BinController';

test.describe('PUT /v3/b/{id} - Update Bin (Replace)', () => {
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

  test('should update existing bin completely', async () => {
    const response = await binController.updateBin(createdBinId, {
      name: 'Updated',
      diploma: false,
    });

    expect(response.status()).toBe(200);

    const getResponse = await binController.getBin(createdBinId);
    const body = await getResponse.json();

    expect(body.record.name).toBe('Updated');
    expect(body.record.diploma).toBe(false);
  });

  test('should replace old data entirely', async () => {
    await binController.updateBin(createdBinId, {
      newField: 'New Value',
    });

    const getResponse = await binController.getBin(createdBinId);
    const body = await getResponse.json();

    expect(body.record.newField).toBe('New Value');
    expect(body.record.name).toBeUndefined();
  });

  test('should update with nested object', async () => {
    await binController.updateBin(createdBinId, {
      user: {
        age: 25,
        city: 'Kyiv',
      },
    });

    const getResponse = await binController.getBin(createdBinId);
    const body = await getResponse.json();

    expect(body.record.user.city).toBe('Kyiv');
  });

  test('should return 404 for non-existing bin', async () => {
    const response = await binController.updateBin(
      '65aaaaaaaaaaaaaaaaaaaaaa',
      { test: true }
    );

    expect(response.status()).toBe(404);
  });

  test('should return 400 for invalid payload', async () => {
    const response = await binController.updateBin(
      createdBinId,
      null as unknown as object
    );

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});