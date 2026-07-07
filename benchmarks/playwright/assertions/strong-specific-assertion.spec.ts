import { test, expect } from '@playwright/test';

test('verify product details with strong assertions', async ({ page }) => {
  await page.goto('https://example.com/products/1');

  // Strong: specific value assertions that verify actual content
  await expect(page.getByRole('heading', { name: 'Premium Widget' })).toBeVisible();
  await expect(page.locator('[data-testid="price"]')).toHaveText('$29.99');
  await expect(page.locator('[data-testid="stock-status"]')).toHaveText('In Stock');
  await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeEnabled();
  await expect(page.locator('.rating')).toHaveAttribute('aria-label', '4.5 out of 5 stars');
});
