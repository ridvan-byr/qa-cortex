import { test as base, expect, type Page } from '@playwright/test';

// Custom test fixtures interface
interface CustomFixtures {
  authenticatedPage: Page;
}

// Extend base test to provide isolated authenticated page context for each test run
const test = base.extend<CustomFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Perform isolated login flow for the worker context
    await page.goto('https://example.com/login');
    await page.getByLabel('Email Address').fill('user@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByRole('heading', { name: 'Welcome back, User' })).toBeVisible();
    
    // Provide isolated page to the test block
    await use(page);
  },
});

test('successful checkout using isolated fixture setup', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('https://example.com/store/checkout');
  
  await authenticatedPage.getByRole('button', { name: 'Confirm Purchase' }).click();
  
  await expect(authenticatedPage.getByText('Thank you for your purchase!')).toBeVisible();
});
