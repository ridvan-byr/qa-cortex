// selenium-webdriver
export {};
declare const Builder: any;
declare const By: any;
declare const expect: any;
declare const describe: any;
declare const before: any;
declare const after: any;
declare const it: any;

let driver: any;

describe('Shared Selenium Driver Tests', function () {
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('uses shared browser state for login', async function () {
    await driver.get('https://example.com/login');
    await driver.findElement(By.id('email')).sendKeys('user@example.com');
    await driver.findElement(By.id('password')).sendKeys('Secret123');
    await driver.findElement(By.css('button[type="submit"]')).click();
    expect(await driver.getCurrentUrl()).to.contain('/dashboard');
  });

  it('depends on the previous logged-in session', async function () {
    await driver.get('https://example.com/settings');
    expect(await driver.getCurrentUrl()).to.contain('/settings');
  });
});

