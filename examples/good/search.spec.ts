import { test, expect } from '@playwright/test';

test.describe('Search Input Field Validations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/search');
  });

  test('valid standard search', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search products...');
    await searchInput.fill('laptop');
    await page.getByRole('button', { name: 'Search' }).click();
    
    await expect(page.getByRole('heading', { name: 'Search Results for "laptop"' })).toBeVisible();
  });

  test('empty search error validation', async ({ page }) => {
    await page.getByRole('button', { name: 'Search' }).click();
    
    await expect(page.getByRole('alert')).toHaveText('Please enter a search term');
  });

  test('unicode and special characters search', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search products...');
    
    // Turkish characters and emoji to test character encoding validation
    await searchInput.fill('türkçe şampuan 🧴');
    await page.getByRole('button', { name: 'Search' }).click();
    
    await expect(page.getByRole('heading', { name: 'Search Results for "türkçe şampuan 🧴"' })).toBeVisible();
  });

  test('security input handling (no injection leaks)', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search products...');
    
    // SQL Injection payload to check input sanitization handling
    await searchInput.fill("' OR 1=1 --");
    await page.getByRole('button', { name: 'Search' }).click();
    
    // Should display graceful empty results state rather than collapsing or throwing 500
    await expect(page.getByText('No products matched your search')).toBeVisible();
  });
});
