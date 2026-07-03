import { test, expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://example.com/login');
  }

  async login(email: string, pass: string) {
    await this.page.getByLabel('Email Address').fill(email);
    await this.page.getByLabel('Password').fill(pass);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }
}

test('successful authentication using POM and role-based locators', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('user@example.com', 'SecurePassword123');
  
  // Strong, accessible, and user-visible state assertion
  await expect(page.getByRole('heading', { name: 'Welcome back, User' })).toBeVisible();
});
