import { test } from '@playwright/test';

test('submit feedback form without assertions', async ({ page }) => {
  await page.goto('https://example.com/feedback');
  
  await page.getByPlaceholder('Name').fill('John Doe');
  await page.getByPlaceholder('Email').fill('john@example.com');
  await page.getByPlaceholder('Comments').fill('Great website!');
  
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Missing assertion: No validation at all that feedback was submitted successfully or redirection occurred.
});
