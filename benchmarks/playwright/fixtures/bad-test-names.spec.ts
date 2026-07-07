import { test, expect } from '@playwright/test';

test('test1', async ({ page }) => {
  await page.goto('https://example.com');
  await page.click('#login');
  await expect(page).toHaveURL('/dashboard');
});

test('check', async ({ page }) => {
  await page.goto('https://example.com/products');
  await page.click('.item');
  await expect(page.locator('.detail')).toBeVisible();
});

test('it works', async ({ page }) => {
  await page.goto('https://example.com/cart');
  await page.click('#checkout');
  await expect(page).toHaveURL('/payment');
});

test('asdf', async ({ page }) => {
  await page.goto('https://example.com/settings');
  await page.click('#save');
  await expect(page.locator('.toast')).toBeVisible();
});
