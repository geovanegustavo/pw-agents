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

async function addFirstProductToCart(page: Page) {
  const firstProduct = page.locator('.inventory_item').first();
  await expect(firstProduct.locator('button')).toHaveText(/add to cart/i);
  await firstProduct.locator('button').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  return firstProduct.locator('.inventory_item_name').textContent();
}

test.describe('Sauce Demo full checkout flow', () => {
  test('login, add one product, checkout, return home and logout', async ({ page }) => {
    await login(page);

    const productName = await addFirstProductToCart(page);

    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart.html/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.cart_item .inventory_item_name')).toHaveText(productName?.trim() || '');

    await page.click('#checkout');
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await page.fill('#first-name', 'Teste');
    await page.fill('#last-name', 'Usuario');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');

    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.summary_info')).toContainText(/Payment Information/);

    await page.click('#finish');
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.locator('.complete-header')).toHaveText(/THANK YOU FOR YOUR ORDER/i);

    await page.click('#back-to-products');
    await expect(page).toHaveURL(/inventory.html/);

    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await expect(page).toHaveURL(SAUCE_DEMO_URL);
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('checkout fails when required customer data is incomplete', async ({ page }) => {
    await login(page);
    await addFirstProductToCart(page);

    await page.click('.shopping_cart_link');
    await page.click('#checkout');
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await page.fill('#last-name', 'Usuario');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(/First Name is required/i);
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  test('complete order and verify cart access without logout', async ({ page }) => {
    await login(page);
    await addFirstProductToCart(page);

    await page.click('.shopping_cart_link');
    await page.click('#checkout');

    await page.fill('#first-name', 'Teste');
    await page.fill('#last-name', 'Usuario');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    await page.click('#finish');

    await page.click('#back-to-products');
    await expect(page).toHaveURL(/inventory.html/);

    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart.html/);
    await expect(page.locator('.title')).toHaveText('Your Cart');
  });
});
