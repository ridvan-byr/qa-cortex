import { test, expect } from '@playwright/test';

test('login test with brittle xpath selectors', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // Brittle XPath selector instead of getByRole
  await page.locator('xpath=//html/body/div[1]/form/div[2]/input').fill('user@example.com');
  
  // Brittle CSS selector with nth-child chains
  await page.locator('div#login-form > div:nth-child(2) > input').fill('password123');
  
  // Brittle XPath click selector
  await page.locator('//button[@class="btn btn-primary btn-block"]').click();
  
  // Brittle XPath verification
  await expect(page.locator('//div[@id="welcome-message"]/h1')).toHaveText('Welcome, User');
});
