import { test, expect } from '@playwright/test';

test('checkout flow with repeated inline selectors', async ({ page }) => {
  await page.goto('https://example.com/checkout');

  // Repeated inline selectors that should be in a Page Object
  await page.fill('div.checkout-form > input[name="firstName"]', 'John');
  await page.fill('div.checkout-form > input[name="lastName"]', 'Doe');
  await page.fill('div.checkout-form > input[name="email"]', 'john@test.com');
  await page.fill('div.checkout-form > input[name="phone"]', '+1234567890');
  await page.fill('div.checkout-form > input[name="address"]', '123 Main St');
  await page.fill('div.checkout-form > input[name="city"]', 'Springfield');
  await page.selectOption('div.checkout-form > select[name="state"]', 'IL');
  await page.fill('div.checkout-form > input[name="zip"]', '62701');

  await page.click('div.checkout-form > button.submit-order');
  await expect(page.locator('.order-confirmation')).toBeVisible();
});

test('edit profile with same inline selectors repeated', async ({ page }) => {
  await page.goto('https://example.com/profile/edit');

  // Same pattern repeated - strong POM candidate
  await page.fill('div.checkout-form > input[name="firstName"]', 'Jane');
  await page.fill('div.checkout-form > input[name="lastName"]', 'Smith');
  await page.fill('div.checkout-form > input[name="email"]', 'jane@test.com');

  await page.click('div.checkout-form > button.submit-order');
  await expect(page.locator('.success-message')).toBeVisible();
});
