import time
from selenium import webdriver
from selenium.webdriver.common.by import By


def test_python_time_sleep():
    driver = webdriver.Chrome()
    try:
        driver.get("https://example.com/search")
        driver.find_element(By.ID, "q").send_keys("qa cortex")
        time.sleep(5)
        assert "search" in driver.current_url
    finally:
        driver.quit()
