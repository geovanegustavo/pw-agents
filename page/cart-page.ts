import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly items: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.title = page.locator('.title');
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Your Cart');
  }

  async itemCount() {
    return this.items.count();
  }

  async removeItemAtIndex(index: number) {
    await this.items.nth(index).locator('.cart_button').click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async firstItemName() {
    return (await this.items.first().locator('.inventory_item_name').textContent())?.trim() || '';
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
