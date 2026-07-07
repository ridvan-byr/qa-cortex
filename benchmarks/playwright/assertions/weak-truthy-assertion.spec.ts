import { test, expect } from '@playwright/test';

test('check user profile with weak assertions', async ({ page }) => {
  await page.goto('https://example.com/profile');

  // Weak: toBeTruthy/toBeDefined don't verify actual values
  const userName = await page.locator('#user-name').textContent();
  expect(userName).toBeTruthy();

  const avatar = page.locator('.avatar');
  await expect(avatar).toBeTruthy();

  const email = await page.locator('#email').inputValue();
  expect(email).toBeDefined();
});
