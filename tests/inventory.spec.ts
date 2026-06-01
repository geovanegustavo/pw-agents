import { test, expect } from '@playwright/test';
import { CartPage } from '../page/cart-page';
import { InventoryPage } from '../page/inventory-page';
import { LoginPage } from '../page/login-page';
import { STANDARD_USER, VALID_PASSWORD } from './test-data';

test.describe('Página de inventário do Sauce Demo', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(STANDARD_USER, VALID_PASSWORD);
  });

  test('exibe estado inicial da página de inventário com ordenação padrão e carrinho vazio', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();
    expect(await inventoryPage.getSortValue()).toBe('az');
    expect(await inventoryPage.isCartBadgeVisible()).toBe(false);
    expect(await inventoryPage.getCartBadgeText()).toBe('');
  });

  test('exibe cards de produto com nome, descrição, preço e imagem', async ({ page }) => {
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

  test('alterna botão adicionar ao carrinho e remover nos produtos', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();

    const initialButtonText = await inventoryPage.getItemButtonTextAtIndex(0);
    expect(initialButtonText.toLowerCase()).toBe('add to cart');

    await inventoryPage.addProductAtIndex(0);
    expect((await inventoryPage.getItemButtonTextAtIndex(0)).toLowerCase()).toBe('remove');

    await inventoryPage.removeProductAtIndex(0);
    expect((await inventoryPage.getItemButtonTextAtIndex(0)).toLowerCase()).toBe('add to cart');
  });

  test('atualiza badge do carrinho ao adicionar e remover produtos', async ({ page }) => {
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

  test('navega para o carrinho e retorna ao inventário preservando o estado dos itens adicionados', async ({ page }) => {
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

  test('abre menu e faz logout a partir da página de inventário', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const loginPage = new LoginPage(page);

    await inventoryPage.expectLoaded();
    await inventoryPage.openMenu();
    await inventoryPage.logout();

    await loginPage.expectLoginVisible();
  });

  test('altera seleção de ordenação e mantém o valor selecionado', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();
    await inventoryPage.setSortOrder('hilo');
    expect(await inventoryPage.getSortValue()).toBe('hilo');
  });
});
