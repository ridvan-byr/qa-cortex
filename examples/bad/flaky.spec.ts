import { test, expect } from '@playwright/test';

test('flaky search results list', async ({ page }) => {
  await page.goto('https://example.com/search');
  
  await page.locator('#search-input').fill('playwright');
  await page.keyboard.press('Enter');
  
  // Flaky: reading DOM count immediately after Enter, which might not be loaded yet (race condition)
  const count = await page.locator('.search-item').count();
  expect(count).toBeGreaterThan(0);
  
  // Flaky: asserting that element is visible based on raw boolean instead of dynamic assertions
  const isVisible = await page.locator('.success-alert').isVisible();
  expect(isVisible).toBe(true);
});
