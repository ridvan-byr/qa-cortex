// selenium-webdriver
export {};
declare const Builder: any;
declare const By: any;
declare const expect: any;
declare const describe: any;
declare const before: any;
declare const it: any;

let driver: any;

describe('Shared Selenium Driver Tests', function () {
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('loads profile using shared driver', async function () {
    await driver.get('https://example.com/profile');
    await driver.findElement(By.id('profile-link')).click();
    expect(await driver.getCurrentUrl()).to.contain('/profile');
  });

  it('loads settings using the same driver', async function () {
    await driver.get('https://example.com/settings');
    expect(await driver.getCurrentUrl()).to.contain('/settings');
  });
});

