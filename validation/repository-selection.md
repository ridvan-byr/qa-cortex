# QA Cortex Selenium Repository Selection

This document records the rationale and technical characteristics of the 5 repositories selected for the Sprint 13D Selenium WebDriver calibration run.

| Repository Name | Language | Runner | Architecture | POM | Assertions | Waits | Reason Selected |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **[selenium-javascript-examples](https://github.com/sridharbandi/Selenium-Javascript-Getting-Started-Examples)** | JavaScript (CommonJS) | Mocha | Standard script layouts | No | Chai / Assert | Explicit waits | Verifies basic Selenium core features (`findElement`, `By.css`, explicit waits) in standard script templates. |
| **[demo-js](https://github.com/saucelabs-training/demo-js)** | JavaScript (CommonJS) | Mocha | Standard modular tests | Yes | Chai (`expect`, `should`) | Explicit waits & sleeps | Official SauceLabs demo repo. Excellent for validating standard assertion frameworks like Chai and resource cleanup (`driver.quit`). |
| **[selenium-webdriverjs-pom-example](https://github.com/EzequielCaballero/selenium-webdriverjs-pom-example)** | JavaScript | Mocha | Test-runner template | Yes | Chai | Explicit waits | Highly structured boilerplate. Validates Page Object encapsulation signals and test structure detection in Selenium. |
| **[example-selenium-javascript-jest](https://github.com/applitools/example-selenium-javascript-jest)** | JavaScript | Jest | Script-based | No | Jest `expect` | Explicit waits | Integrates Selenium WebDriver with the Jest testing framework. Perfect for testing Jest-expect assertion signals. |
| **[selenium-mocha](https://github.com/kiseta/selenium-mocha)** | JavaScript | Mocha | Page Object model | Yes | Chai / Assert | Explicit waits | Clean demo showing real Page Object encapsulation in Node.js Selenium scripts with Mocha and Chai. Perfect for checking Selector Leak detection. |
