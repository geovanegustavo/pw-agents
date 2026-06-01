import { test, expect } from '@playwright/test';
import { InventoryPage } from '../page/inventory-page';
import { LoginPage } from '../page/login-page';
import { BASE_URL, STANDARD_USER, VALID_PASSWORD, LOCKED_OUT_USER, INVALID_USER, INVALID_PASSWORD } from './test-data';

test.describe('Sauce Demo login/logout', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('happy path: login with standard_user and logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(STANDARD_USER, VALID_PASSWORD);
    await inventoryPage.expectLoaded();

    await inventoryPage.openMenu();
    await inventoryPage.logout();

    await expect(page).toHaveURL(BASE_URL);
    await loginPage.expectLoginVisible();
  });

  test('shows username required error when username is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', VALID_PASSWORD);

    await loginPage.expectErrorText(/Username is required/i);
  });

  test('shows password required error when password is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(STANDARD_USER, '');

    await loginPage.expectErrorText(/Password is required/i);
  });

  test('shows invalid credentials error for unknown user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(INVALID_USER, INVALID_PASSWORD);

    await loginPage.expectErrorText(/Username and password do not match any user in this service/i);
  });

  test('shows locked out message for locked_out_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(LOCKED_OUT_USER, VALID_PASSWORD);

    await loginPage.expectErrorText(/Sorry, this user has been locked out./i);
  });

  test('login page displays username, password and login button', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.expectLoginVisible();
  });
});
