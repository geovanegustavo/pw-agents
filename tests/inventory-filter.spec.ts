import { test, expect } from '@playwright/test';
import { InventoryPage } from '../page/inventory-page';
import { LoginPage } from '../page/login-page';
import { STANDARD_USER, VALID_PASSWORD } from './test-data';

const sortOptions = {
  nameAz: 'az',
  nameZa: 'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
};

test.describe('Inventory filter validation', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(STANDARD_USER, VALID_PASSWORD);
  });

  test('should display the correct product filter dropdown labels', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();

    const labels = await inventoryPage.getSortOptionLabels();

    expect(labels).toEqual([
      'Name (A to Z)',
      'Name (Z to A)',
      'Price (low to high)',
      'Price (high to low)',
    ]);
  });

  test('should sort products by name A to Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();

    await inventoryPage.setSortOrder(sortOptions.nameAz);
    const names = await inventoryPage.getItemNames();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    expect(names).toEqual(sortedNames);
  });

  test('should sort products by name Z to A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();

    await inventoryPage.setSortOrder(sortOptions.nameZa);
    const names = await inventoryPage.getItemNames();
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));

    expect(names).toEqual(sortedNames);
  });

  test('should sort products by price low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();

    await inventoryPage.setSortOrder(sortOptions.priceLowHigh);
    const prices = await inventoryPage.getItemPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test('should sort products by price high to low', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();

    await inventoryPage.setSortOrder(sortOptions.priceHighLow);
    const prices = await inventoryPage.getItemPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
  });
});
