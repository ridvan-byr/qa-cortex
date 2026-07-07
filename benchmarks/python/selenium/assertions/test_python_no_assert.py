from selenium import webdriver
from selenium.webdriver.common.by import By


def test_python_no_assert():
    driver = webdriver.Chrome()
    try:
        driver.get("https://example.com/login")
        driver.find_element(By.ID, "email").send_keys("user@example.com")
        driver.find_element(By.ID, "password").send_keys("Secret123")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    finally:
        driver.quit()
