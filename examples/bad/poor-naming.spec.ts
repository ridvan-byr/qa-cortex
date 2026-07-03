import { test, expect } from '@playwright/test';

// Poor test naming (generic name, doesn't describe behavior)
test('test 1', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // Obfuscated variable names
  const a = 'user@example.com';
  const b = 'password123';
  
  await page.getByPlaceholder('Email').fill(a);
  await page.getByPlaceholder('Password').fill(b);
  await page.getByRole('button', { name: 'Log in' }).click();
  
  // Generic variable names
  const ele = page.locator('#header-profile-menu');
  await expect(ele).toBeVisible();
});
