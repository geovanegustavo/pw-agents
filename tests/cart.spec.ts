import { test, expect } from '@playwright/test';
import { CartPage } from '../page/cart-page';
import { InventoryPage } from '../page/inventory-page';
import { LoginPage } from '../page/login-page';
import { STANDARD_USER, VALID_PASSWORD } from './test-data';

test.describe('Sauce Demo carrinho', () => {
  test('adicionar 2 produtos ao carrinho', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(STANDARD_USER, VALID_PASSWORD);
    await inventoryPage.expectLoaded();

    await inventoryPage.addProducts(2);
    await expect(await inventoryPage.getCartBadgeText()).toBe('2');

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await expect(await cartPage.itemCount()).toBe(2);

    await expect(cartPage.firstItemName()).resolves.toBeTruthy();
  });

  test('remover 1 produto do carrinho após adicionar 2 produtos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(STANDARD_USER, VALID_PASSWORD);
    await inventoryPage.expectLoaded();

    await inventoryPage.addProducts(2);
    await expect(await inventoryPage.getCartBadgeText()).toBe('2');

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await expect(await cartPage.itemCount()).toBe(2);

    const firstCartItemName = await cartPage.firstItemName();
    await cartPage.removeItemAtIndex(0);

    await expect(await inventoryPage.getCartBadgeText()).toBe('1');
    await expect(await cartPage.itemCount()).toBe(1);

    const remainingItemName = await cartPage.firstItemName();
    expect(remainingItemName).toBeTruthy();
    expect(remainingItemName).not.toBe(firstCartItemName);

    await cartPage.continueShopping();
    await inventoryPage.expectLoaded();
  });
});
