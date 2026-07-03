import { test, expect } from '@playwright/test';

test('login test with brittle absolute xpath', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // Brittle XPath finding target
  await page.locator('xpath=//html/body/div[1]/form/div[2]/input').fill('user@example.com');
  await page.locator('xpath=//*[@id="password"]').fill('Secret123');
  await page.locator('//button[@type="submit"]').click();

  await expect(page).toHaveURL('https://example.com/dashboard');
});
