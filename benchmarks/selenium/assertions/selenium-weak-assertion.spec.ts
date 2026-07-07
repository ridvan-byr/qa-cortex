// selenium-webdriver
export {};
declare const assert: any;
declare const it: any;

it('uses a weak selenium assertion', async () => {
  const isLoaded = true;
  assert.ok(true);
  assert.ok(isLoaded);
});
