import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorBanner: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.errorBanner = page.locator('[data-test="error"]');
    this.title = page.locator('.title');
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async expectErrorText(expected: string | RegExp) {
    await expect(this.errorBanner).toBeVisible();
    await expect(this.errorBanner).toHaveText(expected);
  }
}
