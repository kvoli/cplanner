from abc import ABC, abstractmethod
from selenium import  webdriver
from bs4 import BeautifulSoup
from urllib import error, request
import os

GOOGLE_CHROME_BIN = os.environ['GOOGLE_CHROME_BIN']
CHROME_DRIVER = os.environ['CHROME_DRIVER']

class Scraper(ABC):

    def __init__(self, url):
        self.driver = webdriver.Chrome(executable_path=CHROME_DRIVER,
                                       options=self._getoptions())
        print("start chrome")
        print(url)
        self.retrieve(page_url=url)

    @staticmethod
    def _getoptions():
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.binary_location = GOOGLE_CHROME_BIN
        return chrome_options

    def retrieve(self, page_url):
        self.driver.get(page_url)
    
    def close(self):
        self.driver.close()

    @staticmethod
    def is_good_url(url):
        try:
            connection = request.urlopen(url)
        except error.HTTPError as e:
            # Return code error (e.g. 404, 501, ...)
            print('HTTPError: {}'.format(e.code))
        except error.URLError as e:
            # Not an HTTP-specific error (e.g. connection refused)
            print('URLError: {}'.format(e.reason))
        else:
            # 200
            return True

    @abstractmethod
    def parse(self):
        pass

    @abstractmethod
    def write(self):
        pass

    @abstractmethod
    def run(self):
        pass