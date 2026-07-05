import { test, expect } from '@playwright/test';

test('submit feedback form with valid data', async ({ page }) => {
  await page.goto('/feedback');
  await page.fill('#name-field', 'Rıdvan');
  await page.fill('#email-field', 'ridvan@test.com');
  await page.fill('#comment-field', 'Excellent quality platform!');
  await page.click('#submit-btn');

  const successMessage = page.locator('.success-alert');
  await expect(successMessage).toBeVisible();
});
