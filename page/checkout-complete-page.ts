import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('#back-to-products');
  }

  async expectLoaded() {
    await expect(this.completeHeader).toHaveText(/THANK YOU FOR YOUR ORDER/i);
  }

  async backHome() {
    await this.backHomeButton.click();
  }
}
