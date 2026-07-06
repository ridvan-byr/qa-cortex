---
id: pattern-input-field
category: ui-component
priority: critical
status: verified
---

# Input Field Pattern

## Purpose

This pattern defines how QA Cortex should evaluate any text input field.

Examples include:

- Username
- First Name
- Last Name
- Email
- Description
- Address
- Search Box

---

## Applicable Test Design Techniques

- Boundary Value Analysis
- Equivalence Partitioning
- Negative Testing
- Unicode Testing
- Localization Testing

---

## Required Validations

### Boundary

- Minimum length
- Maximum length
- Empty value
- Null value

---

### Input Validation

- Allowed characters
- Disallowed characters
- Leading spaces
- Trailing spaces
- Multiple spaces

---

### Unicode

- Turkish characters
- Unicode characters
- Emoji
- RTL languages

---

### Security

- HTML
- JavaScript
- SQL Meta Characters

---

### User Behaviour

- Copy & Paste
- Fast typing
- Replacing text
- Clearing input

---

## QA Review Questions

When reviewing a Playwright test involving an input field, ask:

- Are boundary values tested?

- Is empty input tested?

- Is invalid input tested?

- Are localization scenarios covered?

- Are Unicode characters tested?

- Are security-related inputs validated?

- Is user behavior simulated?

---

## Related Knowledge

- Boundary Value Analysis
- Equivalence Partitioning
- Negative Testing
- Unicode Testing