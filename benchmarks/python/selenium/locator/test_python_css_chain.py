from selenium import webdriver
from selenium.webdriver.common.by import By


def test_python_css_chain():
    driver = webdriver.Chrome()
    try:
        driver.get("https://example.com/products")
        driver.find_element(By.CSS_SELECTOR, "div.main > ul.products > li:nth-child(2) > button").click()
        assert "products" in driver.current_url
    finally:
        driver.quit()
