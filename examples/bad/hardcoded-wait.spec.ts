import { test, expect } from '@playwright/test';

test('load dashboard with hardcoded waits', async ({ page }) => {
  await page.goto('https://example.com/dashboard');
  
  // Hardcoded wait: waits for 5 seconds arbitrarily (very bad smell)
  await page.waitForTimeout(5000);
  
  await expect(page.locator('#chart-container')).toBeVisible();
});
