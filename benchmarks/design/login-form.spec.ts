import { test, expect } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'ValidPass123!');
  await page.click('#submit-btn');

  // Verify successful login
  await expect(page).toHaveURL('/dashboard');
});

test('login with invalid credentials shows error', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#username', 'wronguser');
  await page.fill('#password', 'WrongPass!');
  await page.click('#submit-btn');

  // Verify failure message
  const errorAlert = page.locator('.error-message');
  await expect(errorAlert).toBeVisible();
  await expect(errorAlert).toHaveText('Invalid username or password');
});
