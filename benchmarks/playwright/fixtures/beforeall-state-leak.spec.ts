import { test, expect } from '@playwright/test';

// State set in beforeAll leaks into all tests
let authToken: string;

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto('https://example.com/api/login');
  authToken = 'bearer-token-12345';
  await page.close();
});

test('access dashboard with leaked beforeAll state', async ({ page }) => {
  // Uses authToken from beforeAll - shared state across workers
  await page.setExtraHTTPHeaders({ Authorization: authToken });
  await page.goto('https://example.com/dashboard');
  await expect(page.locator('h1')).toHaveText('Dashboard');
});

test('access settings with leaked beforeAll state', async ({ page }) => {
  // Also depends on authToken - breaks if tests run in different workers
  await page.setExtraHTTPHeaders({ Authorization: authToken });
  await page.goto('https://example.com/settings');
  await expect(page.locator('h1')).toHaveText('Settings');
});
