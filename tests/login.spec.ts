import { test, expect } from '@playwright/test';

const SAUCE_DEMO_URL = 'https://www.saucedemo.com/';
const STANDARD_USER = 'standard_user';
const LOCKED_OUT_USER = 'locked_out_user';
const VALID_PASSWORD = 'secret_sauce';
const INVALID_USER = 'invalid_user';
const INVALID_PASSWORD = 'wrong_password';

test.describe('Sauce Demo login/logout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SAUCE_DEMO_URL);
  });

  test('happy path: login with standard_user and logout', async ({ page }) => {
    await page.fill('#user-name', STANDARD_USER);
    await page.fill('#password', VALID_PASSWORD);
    await page.click('#login-button');

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');

    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    await expect(page).toHaveURL(SAUCE_DEMO_URL);
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('shows username required error when username is empty', async ({ page }) => {
    await page.fill('#password', VALID_PASSWORD);
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
  });

  test('shows password required error when password is empty', async ({ page }) => {
    await page.fill('#user-name', STANDARD_USER);
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
  });

  test('shows invalid credentials error for unknown user', async ({ page }) => {
    await page.fill('#user-name', INVALID_USER);
    await page.fill('#password', INVALID_PASSWORD);
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('shows locked out message for locked_out_user', async ({ page }) => {
    await page.fill('#user-name', LOCKED_OUT_USER);
    await page.fill('#password', VALID_PASSWORD);
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('login page displays username, password and login button', async ({ page }) => {
    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
    await expect(page.locator('.login_logo')).toBeVisible();
  });
});
