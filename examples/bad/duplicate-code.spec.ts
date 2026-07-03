import { test, expect } from '@playwright/test';

test('verify settings page', async ({ page }) => {
  // Duplicate login and navigation logic
  await page.goto('https://example.com/login');
  await page.locator('#username').fill('user@example.com');
  await page.locator('#password').fill('password123');
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL('https://example.com/dashboard');

  await page.goto('https://example.com/settings');
  await expect(page.locator('#settings-title')).toBeVisible();
});

test('verify profile page', async ({ page }) => {
  // Duplicate login and navigation logic (violates modularity/dry)
  await page.goto('https://example.com/login');
  await page.locator('#username').fill('user@example.com');
  await page.locator('#password').fill('password123');
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL('https://example.com/dashboard');

  await page.goto('https://example.com/profile');
  await expect(page.locator('#profile-title')).toBeVisible();
});
