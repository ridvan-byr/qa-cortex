import time
from selenium import webdriver
from selenium.webdriver.common.by import By


def test_python_multiple_smells():
    driver = webdriver.Chrome()
    driver.get("https://example.com/login")
    driver.find_element(By.XPATH, "//html/body/div[1]/form/input[1]").send_keys("user@example.com")
    time.sleep(3)
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
