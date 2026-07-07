// selenium-webdriver
export {};
declare const Builder: any;
declare const By: any;
declare const describe: any;
declare const before: any;
declare const after: any;
declare const it: any;

let driver: any;

describe('Product Filter Tests', function () {
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should filter products with brittle CSS chain', async function () {
    await driver.get('https://example.com/products');

    // Brittle: deep CSS selector chain
    await driver.findElement(By.css('div.main > div.content > ul.products > li:nth-child(2) > div.card > button.add')).click();
    await driver.findElement(By.css('div.sidebar > div.filters > div:nth-child(3) > select > option:nth-child(2)')).click();
    const result = await driver.findElement(By.css('div.main > div.content > div.results > span.count')).getText();

    require('assert').ok(result.includes('items'));
  });
});
