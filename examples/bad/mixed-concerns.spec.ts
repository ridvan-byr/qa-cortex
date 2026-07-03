import { test, expect } from '@playwright/test';

// Giant test mixing multiple unrelated user journeys (monolithic test smell)
test('mixed concerns end to end flow', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://example.com/login');
  await page.getByPlaceholder('Email').fill('user@example.com');
  await page.getByPlaceholder('Password').fill('password123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  
  // Step 2: Update Profile Info (unrelated concern)
  await page.goto('https://example.com/settings/profile');
  await page.getByLabel('Bio').fill('My test profile bio info.');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('.save-success')).toBeVisible();
  
  // Step 3: Browse Store & Add to Cart (another unrelated concern)
  await page.goto('https://example.com/store');
  await page.getByPlaceholder('Search').fill('Laptop');
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Add to Cart' }).first().click();
  await expect(page.locator('.cart-count')).toHaveText('1');
  
  // Step 4: Logout
  await page.getByRole('button', { name: 'Profile Menu' }).click();
  await page.getByRole('menuitem', { name: 'Log out' }).click();
  await expect(page).toHaveURL('https://example.com/');
});
