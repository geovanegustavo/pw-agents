import { test, expect } from '@playwright/test';
import { CartPage } from '../page/cart-page';
import { InventoryPage } from '../page/inventory-page';
import { LoginPage } from '../page/login-page';
import { STANDARD_USER, VALID_PASSWORD } from './test-data';

test.describe('Sauce Demo inventory page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(STANDARD_USER, VALID_PASSWORD);
  });

  test('shows inventory page initial state with default sort and empty cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();
    expect(await inventoryPage.getSortValue()).toBe('az');
    expect(await inventoryPage.isCartBadgeVisible()).toBe(false);
    expect(await inventoryPage.getCartBadgeText()).toBe('');
  });

  test('displays product cards with name, description, price and image', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();

    const names = await inventoryPage.getItemNames();
    expect(names.length).toBeGreaterThan(0);
    expect(names[0]).toBeTruthy();

    const description = await inventoryPage.getItemDescriptionAtIndex(0);
    expect(description).toBeTruthy();

    const imageSrc = await inventoryPage.getItemImageSrcAtIndex(0);
    expect(imageSrc).toContain('/');

    const prices = await inventoryPage.getItemPrices();
    expect(prices.length).toBeGreaterThan(0);
    expect(prices[0]).toBeGreaterThan(0);
  });

  test('toggles add-to-cart and remove state for inventory buttons', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();

    const initialButtonText = await inventoryPage.getItemButtonTextAtIndex(0);
    expect(initialButtonText.toLowerCase()).toBe('add to cart');

    await inventoryPage.addProductAtIndex(0);
    expect((await inventoryPage.getItemButtonTextAtIndex(0)).toLowerCase()).toBe('remove');

    await inventoryPage.removeProductAtIndex(0);
    expect((await inventoryPage.getItemButtonTextAtIndex(0)).toLowerCase()).toBe('add to cart');
  });

  test('updates cart badge when adding and removing products', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();

    await inventoryPage.addProductAtIndex(0);
    await inventoryPage.addProductAtIndex(1);
    expect(await inventoryPage.getCartBadgeText()).toBe('2');

    await inventoryPage.removeProductAtIndex(1);
    expect(await inventoryPage.getCartBadgeText()).toBe('1');

    await inventoryPage.removeProductAtIndex(0);
    expect(await inventoryPage.isCartBadgeVisible()).toBe(false);
  });

  test('navigates to cart and returns to inventory preserving added item state', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.expectLoaded();
    await inventoryPage.addProductAtIndex(2);

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    expect(await cartPage.itemCount()).toBe(1);
    expect(await cartPage.firstItemName()).toBeTruthy();

    await cartPage.continueShopping();
    await inventoryPage.expectLoaded();
    expect((await inventoryPage.getItemButtonTextAtIndex(2)).toLowerCase()).toBe('remove');
  });

  test('opens menu and logs out from inventory page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const loginPage = new LoginPage(page);

    await inventoryPage.expectLoaded();
    await inventoryPage.openMenu();
    await inventoryPage.logout();

    await loginPage.expectLoginVisible();
  });

  test('changes sort selection and retains selected value', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();
    await inventoryPage.setSortOrder('hilo');
    expect(await inventoryPage.getSortValue()).toBe('hilo');
  });
});
