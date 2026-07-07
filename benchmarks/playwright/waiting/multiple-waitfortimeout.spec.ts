import { test, expect } from '@playwright/test';

test('dashboard loading test with multiple hardcoded waits', async ({ page }) => {
  await page.goto('https://example.com/dashboard');

  // Multiple redundant hardcoded waits in a single test
  await page.waitForTimeout(3000);
  await page.click('#load-more');
  await page.waitForTimeout(2000);
  await page.click('#next-page');
  await page.waitForTimeout(1500);

  await expect(page.locator('.results')).toBeVisible();
});
