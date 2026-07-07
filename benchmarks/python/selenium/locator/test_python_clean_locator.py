from selenium import webdriver
from selenium.webdriver.common.by import By


def test_python_clean_locator():
    driver = webdriver.Chrome()
    try:
        driver.get("https://example.com/login")
        driver.find_element(By.ID, "email").send_keys("user@example.com")
        driver.find_element(By.CSS_SELECTOR, "[data-testid='submit-login']").click()
        assert "dashboard" in driver.current_url
    finally:
        driver.quit()
