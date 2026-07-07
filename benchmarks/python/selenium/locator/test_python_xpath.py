from selenium import webdriver
from selenium.webdriver.common.by import By


def test_python_xpath_locator():
    driver = webdriver.Chrome()
    try:
        driver.get("https://example.com/login")
        driver.find_element(By.XPATH, "//div[@class='login']/form/input[1]").send_keys("user@example.com")
        assert "login" in driver.current_url
    finally:
        driver.quit()
