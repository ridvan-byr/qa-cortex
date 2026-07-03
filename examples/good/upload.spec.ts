import { test, expect } from '@playwright/test';
import path from 'path';

test('upload profile avatar using correct file chooser event waiting', async ({ page }) => {
  await page.goto('https://example.com/settings/profile');
  
  // Set up the listener before triggering the event to avoid race conditions
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: 'Select File' }).click();
  const fileChooser = await fileChooserPromise;
  
  // Select files using resolved path
  const filePath = path.resolve(__dirname, '../../assets/avatar.png');
  await fileChooser.setFiles(filePath);
  
  // Strong outcome assertion verifying successful upload preview
  await expect(page.locator('#avatar-preview')).toBeVisible();
  await expect(page.locator('#avatar-preview')).toHaveAttribute('src', /avatar/);
});
