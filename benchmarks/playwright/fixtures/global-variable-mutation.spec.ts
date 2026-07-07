import { test, expect } from '@playwright/test';

// Shared mutable state across tests - violates test isolation
let loggedInUser: string | null = null;
let cartItemCount = 0;

test('login and set global user', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.fill('#email', 'user@example.com');
  await page.fill('#password', 'Secret123');
  await page.click('#submit');

  loggedInUser = 'user@example.com';
  await expect(page).toHaveURL('/dashboard');
});

test('add item to cart using shared state', async ({ page }) => {
  // Depends on previous test's global variable
  if (!loggedInUser) throw new Error('User not logged in');

  await page.goto('https://example.com/products');
  await page.click('.product:first-child .add-btn');
  cartItemCount++;

  await expect(page.locator('.cart-count')).toHaveText(String(cartItemCount));
});

test('verify cart using shared counter', async ({ page }) => {
  // Fragile: depends on cartItemCount from prior test
  await page.goto('https://example.com/cart');
  await expect(page.locator('.total-items')).toHaveText(String(cartItemCount));
});
