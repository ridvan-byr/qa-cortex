import { test } from '@playwright/test';
import { LoginPage } from '../../../examples/good/login.spec';

test('login test with selector leakage', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  
  // Selector Leak: LoginPage POM is imported, but we still write a raw xpath locator directly in the test file.
  await page.locator('//button[@id="login-btn"]').click();
});
