import { expect, type Locator, type Page } from '@playwright/test';
import { BASE_URL } from '../tests/test-data';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorBanner: Locator;
  readonly logo: Locator;
  readonly credentialsInfo: Locator;
  readonly passwordInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorBanner = page.locator('[data-test="error"]');
    this.logo = page.locator('.login_logo');
    this.credentialsInfo = page.locator('.login_credentials_wrap');
    this.passwordInfo = page.locator('.login_password');
  }

  async goto() {
    await this.page.goto(BASE_URL);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithEnter(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.passwordInput.press('Enter');
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async expectLoginVisible() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.logo).toBeVisible();
  }

  async expectLoginInstructions() {
    await expect(this.credentialsInfo).toContainText(/accepted usernames are/i);
    await expect(this.passwordInfo).toContainText(/password for all users/i);
  }

  async expectPasswordMasked() {
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }

  async expectInputPlaceholders() {
    await expect(this.usernameInput).toHaveAttribute('placeholder', 'Username');
    await expect(this.passwordInput).toHaveAttribute('placeholder', 'Password');
  }

  async expectLoginButtonLabel() {
    await expect(this.loginButton).toHaveAttribute('value', 'Login');
  }

  async expectPageTitle() {
    await expect(this.page).toHaveTitle('Swag Labs');
  }

  async expectErrorHidden() {
    await expect(this.errorBanner).toBeHidden();
  }

  async expectErrorText(expected: string | RegExp) {
    await expect(this.errorBanner).toBeVisible();
    await expect(this.errorBanner).toHaveText(expected);
  }
}
