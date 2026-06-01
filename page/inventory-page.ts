import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly items: Locator;
  readonly sortSelect: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.inventory_item');
    this.sortSelect = page.locator('.product_sort_container');
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

  async removeProductAtIndex(index: number) {
    const item = this.items.nth(index);
    const button = item.locator('button');
    await expect(button).toHaveText(/remove/i);
    await button.click();
    return (await item.locator('.inventory_item_name').textContent())?.trim() || '';
  }

  async getItemButtonTextAtIndex(index: number) {
    return (await this.items.nth(index).locator('button').textContent())?.trim() || '';
  }

  async addProducts(count: number) {
    const names: string[] = [];
    for (let index = 0; index < count; index += 1) {
      names.push(await this.addProductAtIndex(index));
    }
    return names;
  }

  async getSortValue() {
    return this.sortSelect.inputValue();
  }

  async setSortOrder(value: string) {
    await this.sortSelect.selectOption(value);
  }

  async getItemNames() {
    return this.items.locator('.inventory_item_name').allTextContents();
  }

  async getItemPrices() {
    const priceTexts = await this.items.locator('.inventory_item_price').allTextContents();
    return priceTexts.map((text) => Number(text.replace(/[^0-9.]/g, '')));
  }

  async getItemDescriptionAtIndex(index: number) {
    return (await this.items.nth(index).locator('.inventory_item_desc').textContent())?.trim() || '';
  }

  async getItemImageSrcAtIndex(index: number) {
    return (await this.items.nth(index).locator('.inventory_item_img img').getAttribute('src')) || '';
  }

  async getSortOptionLabels() {
    return this.sortSelect.locator('option').allTextContents();
  }

  async getCartBadgeText() {
    if ((await this.cartBadge.count()) === 0) {
      return '';
    }
    return (await this.cartBadge.textContent())?.trim() || '';
  }

  async isCartBadgeVisible() {
    if ((await this.cartBadge.count()) === 0) {
      return false;
    }
    return this.cartBadge.isVisible();
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
