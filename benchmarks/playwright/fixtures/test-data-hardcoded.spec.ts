import { test, expect } from '@playwright/test';

test('register user with hardcoded magic strings', async ({ page }) => {
  await page.goto('https://example.com/register');

  // Magic strings: hardcoded test data scattered across tests
  await page.fill('#email', 'testuser123@tempmail.com');
  await page.fill('#password', 'P@ssw0rd!2024');
  await page.fill('#confirm-password', 'P@ssw0rd!2024');
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'TestUser');
  await page.fill('#phone', '+1-555-0123');
  await page.selectOption('#country', 'US');
  await page.fill('#address', '742 Evergreen Terrace, Springfield');
  await page.fill('#zip-code', '90210');

  await page.click('#submit-registration');
  await expect(page).toHaveURL('/welcome');
});

test('login with same hardcoded credentials', async ({ page }) => {
  await page.goto('https://example.com/login');

  // Same magic strings repeated - should be in fixture/data file
  await page.fill('#email', 'testuser123@tempmail.com');
  await page.fill('#password', 'P@ssw0rd!2024');
  await page.click('#login-btn');

  await expect(page).toHaveURL('/dashboard');
});
