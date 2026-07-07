import { test } from '@playwright/test';

test('add item to cart without any assertions', async ({ page }) => {
  await page.goto('https://example.com/products');

  // No expect/assertion at all - just clicking around
  await page.click('.product-card:first-child');
  await page.click('#add-to-cart');
  await page.click('.continue-shopping');
  await page.click('#view-cart');
});
