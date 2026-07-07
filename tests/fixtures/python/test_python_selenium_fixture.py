import time
from selenium import webdriver
from selenium.webdriver.common.by import By

def test_login_flow():
    # Setup driver (Resource Cleanup check: opens browser but does not call driver.quit())
    driver = webdriver.Chrome()
    driver.get("https://example.com/login")

    # Brittle locator (By.XPATH)
    username_field = driver.find_element(By.XPATH, "//div[@class='login-container']/form/input[1]")
    username_field.send_keys("testuser")

    # Brittle locator (legacy find_element_by_xpath)
    password_field = driver.find_element_by_xpath("//input[@type='password']")
    password_field.send_keys("password123")

    # Hardcoded wait (time.sleep)
    time.sleep(5)

    # Missing assertion check: no 'assert' keyword anywhere in this function
