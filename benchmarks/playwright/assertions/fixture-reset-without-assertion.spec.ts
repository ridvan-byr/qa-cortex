import { test } from '@playwright/test';

class Wallet {
  async openSettings(): Promise<void> {}
  async openAdvancedSettings(): Promise<void> {}
  async resetAccount(): Promise<void> {}
  async goBackToHomePage(): Promise<void> {}
}

test('reset wallet account', async () => {
  const wallet = new Wallet();

  await wallet.openSettings();
  await wallet.openAdvancedSettings();
  await wallet.resetAccount();
  await wallet.goBackToHomePage();
});
