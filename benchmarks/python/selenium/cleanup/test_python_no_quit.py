from selenium import webdriver
from selenium.webdriver.common.by import By


def test_python_no_quit():
    driver = webdriver.Chrome()
    driver.get("https://example.com/profile")
    driver.find_element(By.ID, "profile-link").click()
    assert "profile" in driver.current_url
