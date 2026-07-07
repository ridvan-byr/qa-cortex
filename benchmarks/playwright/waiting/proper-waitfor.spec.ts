import { test, expect } from '@playwright/test';

test('proper waiting with auto-wait assertions', async ({ page }) => {
  await page.goto('https://example.com/products');

  // Clean: relying on Playwright's built-in auto-waiting
  await page.getByRole('button', { name: 'Load Products' }).click();
  await expect(page.getByRole('list')).toBeVisible();

  const items = page.getByRole('listitem');
  await expect(items).toHaveCount(10);
  await expect(items.first()).toContainText('Product');
});
