import { test, expect } from '@playwright/test';

test('login form with auto-generated IDs', async ({ page }) => {
  await page.goto('https://example.com/login');

  // Fragile: auto-generated IDs that change on every build
  await page.locator('#input-el-1234').fill('user@example.com');
  await page.locator('#btn-submit-5678').click();
  await page.locator('#div-wrapper-9012 > span').click();

  await expect(page).toHaveURL('/dashboard');
});
