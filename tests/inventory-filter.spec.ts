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

test.describe('Validação de filtro de inventário', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(STANDARD_USER, VALID_PASSWORD);
  });

  test('deve exibir os rótulos corretos do dropdown de filtros', async ({ page }) => {
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

  test('deve ordenar produtos por nome de A a Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();

    await inventoryPage.setSortOrder(sortOptions.nameAz);
    const names = await inventoryPage.getItemNames();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    expect(names).toEqual(sortedNames);
  });

  test('deve ordenar produtos por nome de Z a A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();

    await inventoryPage.setSortOrder(sortOptions.nameZa);
    const names = await inventoryPage.getItemNames();
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));

    expect(names).toEqual(sortedNames);
  });

  test('deve ordenar produtos por preço do menor para o maior', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();

    await inventoryPage.setSortOrder(sortOptions.priceLowHigh);
    const prices = await inventoryPage.getItemPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test('deve ordenar produtos por preço do maior para o menor', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();

    await inventoryPage.setSortOrder(sortOptions.priceHighLow);
    const prices = await inventoryPage.getItemPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
  });
});
