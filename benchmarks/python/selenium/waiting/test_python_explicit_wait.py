from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


def test_python_explicit_wait():
    driver = webdriver.Chrome()
    try:
        driver.get("https://example.com/search")
        driver.find_element(By.ID, "q").send_keys("qa cortex")
        result = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "results")))
        assert result.is_displayed()
    finally:
        driver.quit()
