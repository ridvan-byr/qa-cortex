// selenium-webdriver
export {};
declare const Builder: any;
declare const By: any;
declare const it: any;

it('submits a selenium login form without assertion', async () => {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://example.com/login');
    await driver.findElement(By.id('email')).sendKeys('user@example.com');
    await driver.findElement(By.id('password')).sendKeys('Secret123');
    await driver.findElement(By.css('button[type="submit"]')).click();
  } finally {
    await driver.quit();
  }
});
