import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By


@pytest.fixture
def driver():
    instance = webdriver.Chrome()
    yield instance
    instance.quit()


def test_python_proper_teardown(driver):
    driver.get("https://example.com/profile")
    driver.find_element(By.ID, "profile-link").click()
    assert "profile" in driver.current_url
