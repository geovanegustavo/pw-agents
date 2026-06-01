import { test, expect, type Page } from '@playwright/test';

const SAUCE_DEMO_URL = 'https://www.saucedemo.com/';
const STANDARD_USER = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';

async function login(page: Page) {
  await page.goto(SAUCE_DEMO_URL);
  await page.fill('#user-name', STANDARD_USER);
  await page.fill('#password', VALID_PASSWORD);
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
}

test.describe('Sauce Demo carrinho', () => {
  test('adicionar 2 produtos ao carrinho', async ({ page }) => {
    await login(page);

    const firstProduct = page.locator('.inventory_item').first();
    const secondProduct = page.locator('.inventory_item').nth(1);

    await expect(firstProduct.locator('button')).toHaveText(/add to cart/i);
    await expect(secondProduct.locator('button')).toHaveText(/add to cart/i);

    await firstProduct.locator('button').click();
    await secondProduct.locator('button').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart.html/);

    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);

    await expect(cartItems.nth(0).locator('.cart_button')).toHaveText('Remove');
    await expect(cartItems.nth(1).locator('.cart_button')).toHaveText('Remove');
  });

  test('remover 1 produto do carrinho após adicionar 2 produtos', async ({ page }) => {
    await login(page);

    const firstProduct = page.locator('.inventory_item').first();
    const secondProduct = page.locator('.inventory_item').nth(1);

    await firstProduct.locator('button').click();
    await secondProduct.locator('button').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart.html/);

    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);

    const firstCartItemName = (await cartItems.nth(0).locator('.inventory_item_name').textContent())?.trim();
    await cartItems.nth(0).locator('.cart_button').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await expect(page.locator('.cart_item')).toHaveCount(1);

    const remainingItemName = (await page.locator('.cart_item').first().locator('.inventory_item_name').textContent())?.trim();
    expect(remainingItemName).toBeTruthy();
    expect(remainingItemName).not.toBe(firstCartItemName);

    await page.click('#continue-shopping');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_item').first().locator('button')).toHaveText(/^(Add to cart|Remove)$/);
  });
});
