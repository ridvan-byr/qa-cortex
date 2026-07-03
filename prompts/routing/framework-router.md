# Framework Router

## Purpose

Detect the automation framework used in the provided test code.

---

## Supported Frameworks

- Playwright
- Cypress
- Selenium
- Appium
- REST Assured
- Postman
- Karate

---

## Detection Strategy

Identify framework-specific imports, APIs, and syntax.

Examples:

Playwright

- import { test, expect } from '@playwright/test'
- page.getByRole()
- page.locator()
- page.goto()

Cypress

- cy.visit()
- cy.get()
- cy.contains()

Selenium

- WebDriver
- By.css()
- driver.findElement()

---

## Rules

Detect only one primary framework.

If multiple frameworks are detected, report a mixed-framework warning.

Never assume a framework without evidence.

---

## Output

Framework Name

Confidence Score

Evidence