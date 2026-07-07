// selenium-webdriver
export {};
declare const Builder: any;
declare const By: any;
declare const describe: any;
declare const before: any;
declare const after: any;
declare const it: any;

let driver: any;

describe('Search Tests with Implicit Wait', function () {
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    // Anti-pattern: using implicitlyWait instead of explicit waits
    await driver.manage().setTimeouts({ implicit: 10000 });
  });

  after(async function () {
    await driver.quit();
  });

  it('should search and find results using implicit wait', async function () {
    await driver.get('https://example.com/search');
    await driver.findElement(By.id('search-input')).sendKeys('Selenium');
    await driver.findElement(By.id('search-btn')).click();

    // implicitlyWait masks real timing issues
    const results = await driver.findElements(By.css('.search-result'));
    require('assert').ok(results.length > 0, 'Expected search results');
  });
});
