import { test, expect } from '@playwright/test';
import { CartPage } from '../page/cart-page';
import { CheckoutCompletePage } from '../page/checkout-complete-page';
import { CheckoutStepOnePage } from '../page/checkout-step-one-page';
import { CheckoutStepTwoPage } from '../page/checkout-step-two-page';
import { InventoryPage } from '../page/inventory-page';
import { LoginPage } from '../page/login-page';
import { STANDARD_USER, VALID_PASSWORD } from './test-data';

test.describe('Fluxo completo de checkout do Sauce Demo', () => {
  test('fazer login, adicionar um produto, checkout, retornar para home e logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.goto();
    await loginPage.login(STANDARD_USER, VALID_PASSWORD);
    await inventoryPage.expectLoaded();

    const productName = await inventoryPage.addProductAtIndex(0);

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await expect(await cartPage.firstItemName()).toBe(productName);

    await cartPage.checkout();
    await checkoutStepOnePage.expectLoaded();
    await checkoutStepOnePage.fillCustomerInformation('Teste', 'Usuario', '12345');
    await checkoutStepOnePage.continue();

    await checkoutStepTwoPage.expectLoaded();
    await checkoutStepTwoPage.finish();

    await checkoutCompletePage.expectLoaded();
    await checkoutCompletePage.backHome();
    await inventoryPage.expectLoaded();

    await inventoryPage.openMenu();
    await inventoryPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await loginPage.expectLoginVisible();
  });

  test('checkout falha quando dados de cliente obrigatórios estão incompletos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);

    await loginPage.goto();
    await loginPage.login(STANDARD_USER, VALID_PASSWORD);
    await inventoryPage.expectLoaded();

    await inventoryPage.addProductAtIndex(0);
    await inventoryPage.openCart();
    await cartPage.checkout();

    await checkoutStepOnePage.expectLoaded();
    await checkoutStepOnePage.fillCustomerInformation('', 'Usuario', '12345');
    await checkoutStepOnePage.continue();

    await checkoutStepOnePage.expectErrorText(/First Name is required/i);
  });

  test('finalizar pedido e verificar acesso ao carrinho sem logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.goto();
    await loginPage.login(STANDARD_USER, VALID_PASSWORD);
    await inventoryPage.expectLoaded();

    await inventoryPage.addProductAtIndex(0);
    await inventoryPage.openCart();
    await cartPage.checkout();

    await checkoutStepOnePage.expectLoaded();
    await checkoutStepOnePage.fillCustomerInformation('Teste', 'Usuario', '12345');
    await checkoutStepOnePage.continue();
    await checkoutStepTwoPage.expectLoaded();
    await checkoutStepTwoPage.finish();

    await checkoutCompletePage.expectLoaded();
    await checkoutCompletePage.backHome();
    await inventoryPage.expectLoaded();

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
  });
});
