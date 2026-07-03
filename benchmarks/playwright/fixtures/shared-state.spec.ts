import { test, expect } from '@playwright/test';

// Global mutable variable sharing state between tests
let globalUserId = '';

test('step 1: create user', async ({ page }) => {
  await page.goto('https://example.com/users/new');
  await page.locator('#username').fill('new_user');
  await page.click('#submit-btn');
  
  globalUserId = await page.locator('#user-id-output').innerText();
});

test('step 2: delete user', async ({ page }) => {
  // Violates isolation - depends on step 1 to have run and set globalUserId
  await page.goto(`https://example.com/users/delete/${globalUserId}`);
  await expect(page.locator('#success-message')).toBeVisible();
});
