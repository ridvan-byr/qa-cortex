import { test, expect } from '@playwright/test';

// Shared global state across tests (breaks test isolation and parallel execution)
let createdUserId = '';

test('create user test', async ({ page }) => {
  await page.goto('https://example.com/admin');
  await page.getByRole('button', { name: 'Create User' }).click();
  await page.getByPlaceholder('Name').fill('Test User');
  await page.getByRole('button', { name: 'Save' }).click();
  
  const alert = page.locator('.user-created-alert');
  await expect(alert).toBeVisible();
  
  createdUserId = await page.locator('.user-id-span').innerText();
});

test('delete user test', async ({ page }) => {
  // Depends on the 'create user test' executing first and mutating createdUserId
  await page.goto(`https://example.com/admin/user/${createdUserId}`);
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator('.delete-success-alert')).toBeVisible();
});
