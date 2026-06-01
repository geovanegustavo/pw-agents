import { test, expect } from '@playwright/test';
import { InventoryPage } from '../page/inventory-page';
import { LoginPage } from '../page/login-page';
import { BASE_URL, STANDARD_USER, VALID_PASSWORD, LOCKED_OUT_USER, INVALID_USER, INVALID_PASSWORD } from './test-data';

test.describe('Login/logout do Sauce Demo', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('caminho feliz: login com standard_user e logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(STANDARD_USER, VALID_PASSWORD);
    await inventoryPage.expectLoaded();

    await inventoryPage.openMenu();
    await inventoryPage.logout();

    await expect(page).toHaveURL(BASE_URL);
    await loginPage.expectLoginVisible();
  });

  test('mostra erro de usuário obrigatório quando o nome de usuário está vazio', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', VALID_PASSWORD);

    await loginPage.expectErrorText(/Username is required/i);
  });

  test('mostra erro de senha obrigatória quando a senha está vazia', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(STANDARD_USER, '');

    await loginPage.expectErrorText(/Password is required/i);
  });

  test('mostra erro de credenciais inválidas para usuário desconhecido', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(INVALID_USER, INVALID_PASSWORD);

    await loginPage.expectErrorText(/Username and password do not match any user in this service/i);
  });

  test('mostra mensagem de usuário bloqueado para locked_out_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(LOCKED_OUT_USER, VALID_PASSWORD);

    await loginPage.expectErrorText(/Sorry, this user has been locked out./i);
  });

  test('página de login exibe título, placeholders, rótulo do botão de login, instruções e campo de senha mascarado', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.expectPageTitle();
    await loginPage.expectLoginVisible();
    await loginPage.expectInputPlaceholders();
    await loginPage.expectLoginButtonLabel();
    await loginPage.expectLoginInstructions();
    await loginPage.expectPasswordMasked();
  });

  test('permite login pressionando Enter no campo de senha', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.loginWithEnter(STANDARD_USER, VALID_PASSWORD);
    await inventoryPage.expectLoaded();
  });

  test('mostra erro de credenciais inválidas quando usuário e senha são apenas espaços', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('   ', '   ');

    await loginPage.expectErrorText(/Username and password do not match any user in this service/i);
  });

  test('permite nova tentativa com credenciais válidas após login inválido', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(INVALID_USER, INVALID_PASSWORD);
    await loginPage.expectErrorText(/Username and password do not match any user in this service/i);

    await loginPage.login(STANDARD_USER, VALID_PASSWORD);
    await inventoryPage.expectLoaded();
  });

  test('permite editar o usuário após login inválido mantendo a mensagem de erro', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(INVALID_USER, INVALID_PASSWORD);
    await loginPage.expectErrorText(/Username and password do not match any user in this service/i);

    await loginPage.fillUsername(STANDARD_USER);
    await expect(loginPage.usernameInput).toHaveValue(STANDARD_USER);
    await loginPage.expectErrorText(/Username and password do not match any user in this service/i);
  });

  test('campos de login são resetados após logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(STANDARD_USER, VALID_PASSWORD);
    await inventoryPage.expectLoaded();
    await inventoryPage.openMenu();
    await inventoryPage.logout();

    await expect(page).toHaveURL(BASE_URL);
    await loginPage.expectLoginVisible();
    await expect(loginPage.usernameInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');
  });
});
