import { test, expect } from '@playwright/test';

test('login with clean role-based locators', async ({ page }) => {
  await page.goto('https://example.com/login');

  // Clean: using recommended Playwright locator strategies
  await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Secret123!');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
});
