import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly finishButton: Locator;
  readonly title: Locator;
  readonly summaryInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.locator('#finish');
    this.title = page.locator('.title');
    this.summaryInfo = page.locator('.summary_info');
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Checkout: Overview');
    await expect(this.summaryInfo).toBeVisible();
  }

  async finish() {
    await this.finishButton.click();
  }
}
