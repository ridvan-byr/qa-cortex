// selenium-webdriver
export {};
declare const Builder: any;
declare const By: any;
declare const expect: any;
declare const it: any;
declare const LoginPage: any;

it('leaks a selenium selector while using page object', async () => {
  const driver = await new Builder().forBrowser('chrome').build();
  const loginPage = new LoginPage(driver);

  try {
    await loginPage.open();
    await driver.findElement(By.css('button[type="submit"]')).click();
    expect(await driver.getCurrentUrl()).to.contain('/dashboard');
  } finally {
    await driver.quit();
  }
});
