import { test, expect } from '@playwright/test';

test('checkout with deep nth-child CSS chain', async ({ page }) => {
  await page.goto('https://example.com/cart');

  // Brittle: deeply nested CSS chains that break on DOM restructuring
  await page.locator('div.main-content > div:nth-child(2) > ul > li:nth-child(3) > button.add').click();
  await page.locator('div.sidebar > div:nth-child(1) > div.panel > span:nth-child(2)').click();
  await page.locator('table > tbody > tr:nth-child(4) > td:nth-child(2) > a').click();

  await expect(page.locator('.checkout-total')).toBeVisible();
});
