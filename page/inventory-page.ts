import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly items: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.title = page.locator('.title');
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Products');
    await expect(this.items.first()).toBeVisible();
  }

  async addProductAtIndex(index: number) {
    const item = this.items.nth(index);
    const button = item.locator('button');
    await expect(button).toHaveText(/add to cart/i);
    await button.click();
    return (await item.locator('.inventory_item_name').textContent())?.trim() || '';
  }

  async addProducts(count: number) {
    const names: string[] = [];
    for (let index = 0; index < count; index += 1) {
      names.push(await this.addProductAtIndex(index));
    }
    return names;
  }

  async getCartBadgeText() {
    return this.cartBadge.textContent();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }
}
