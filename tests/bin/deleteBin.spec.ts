import { test, expect } from '../../src/fixtures/apiFixture';
import { BinController } from '../../src/controllers/BinController';

test.describe('DELETE /v3/b/{id} - Delete Bin', () => {
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

  test('should delete existing bin', async () => {
    const response = await binController.deleteBin(createdBinId);

    expect(response.status()).toBe(200);
  });

  test('should return 404 after deletion', async () => {
    await binController.deleteBin(createdBinId);

    const getResponse = await binController.getBin(createdBinId);
    expect(getResponse.status()).toBe(404);
  });

  test('should return 404 when deleting already deleted bin', async () => {
    await binController.deleteBin(createdBinId);

    const secondDelete = await binController.deleteBin(createdBinId);
    expect(secondDelete.status()).toBe(404);
  });

  test('should return 404 for non-existing bin', async () => {
    const response = await binController.deleteBin(
      '65aaaaaaaaaaaaaaaaaaaaaa'
    );

    expect(response.status()).toBe(404);
  });

  test('should return error for invalid id format', async () => {
    const response = await binController.deleteBin('invalid-id');

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});