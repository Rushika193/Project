from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from scrapper.settings import BASE_DIR
import os


class ChromeDriver:

    def __init__(self):
        CHROMEDRIVER_PATH = "C:/Users/Dell/Downloads/chromedriver"
        if os.name == 'nt':
            CHROMEDRIVER_PATH = os.path.join(BASE_DIR, 'driver','selenium','chromedriver.exe')
        WINDOW_SIZE = "1920,1080"

        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)
        chrome_options.add_argument('--no-sandbox')
        self.driver = webdriver.Chrome(executable_path="C:/Users/Dell/Downloads/chromedriver/chromedriver.exe",options=chrome_options)
                                                                              

    def get_driver(self):
        return self.driver
