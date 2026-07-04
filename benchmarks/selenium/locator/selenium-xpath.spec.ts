// selenium-webdriver
export {};
declare const Builder: any;
declare const By: any;
declare const expect: any;
declare const it: any;

it('logs in with brittle selenium xpath', async () => {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://example.com/login');
    await driver.findElement(By.xpath('//button[@type="submit"]')).click();
    expect(await driver.getCurrentUrl()).to.contain('/dashboard');
  } finally {
    await driver.quit();
  }
});
