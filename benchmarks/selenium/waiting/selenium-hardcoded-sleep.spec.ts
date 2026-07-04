// selenium-webdriver
export {};
declare const Builder: any;
declare const By: any;
declare const expect: any;
declare const it: any;

it('waits with a hardcoded selenium sleep', async () => {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://example.com/search');
    await driver.findElement(By.id('search')).sendKeys('qa brain');
    await driver.sleep(3000);
    expect(await driver.getTitle()).to.contain('Search');
  } finally {
    await driver.quit();
  }
});
