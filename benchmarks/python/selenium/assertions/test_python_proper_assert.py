from selenium import webdriver
from selenium.webdriver.common.by import By


def test_python_proper_assert():
    driver = webdriver.Chrome()
    try:
        driver.get("https://example.com/profile")
        heading = driver.find_element(By.ID, "profile-heading")
        assert heading.text == "Profile"
    finally:
        driver.quit()
