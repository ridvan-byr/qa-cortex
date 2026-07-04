// selenium-webdriver
export {};
declare const Builder: any;
declare const By: any;
declare const expect: any;
declare const it: any;

it('creates a selenium driver without cleanup', async () => {
  const driver = await new Builder().forBrowser('chrome').build();

  await driver.get('https://example.com/profile');
  await driver.findElement(By.id('profile-link')).click();
  expect(await driver.getCurrentUrl()).to.contain('/profile');
});
