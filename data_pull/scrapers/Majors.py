from scrapers.Scraper import Scraper
from abc import ABC, abstractmethod
from bs4 import BeautifulSoup
from collections import defaultdict
import re
import csv
import time
import logging
import scrapers.constants
import json

# main index page, with no filters applied (every entry)
URL_SUFFIX = "what-will-i-study"
URL_PREFIX ="https://study.unimelb.edu.au/find/courses"


# html constants
HTML_PARSER = "html.parser"
TEXT_ELEMENT = "a"
LINK_ELEMENT = "href"
CLASS_ATRIBUTE = "class"
TABLE_ROW_ELEMENT = "tr"
ROW_COLUMN_ELEMENT = "td"
ROW_COLUMN_HEADER = "th"
TABLE_ELEMENT = "table"
DATA_LABEL = "data-label"
ID = "id"
HEADER_3 = "h3"
HEADER_2 = "h2"
SPAN = "span"

# parsing constants
TABLE_CONTAINER = "table table--togglerow"
TABLE_ROW_NAME = "td col-75"


class MajorsScraper(Scraper):

    def __init__(self):
        super().__init__()
        self.parse_time = time.time()
        self._get_logging_options()
        self.log = logging.getLogger("major-scraper")
        self.busy = False

    def _get_logging_options(self):
        logging.basicConfig(
            filename="logs/scraper.log", level=logging.INFO, format='%(levelname)s:%(message)s')

    @staticmethod
    def get_page_url(course, grad_level):
        return "{}/{}/{}/{}/".format(URL_PREFIX, grad_level, course, URL_SUFFIX)

    def is_busy(self):
        return self.busy

    def open_page(self, url):
        print(url)
        super().retrieve(url)

    def fetch_page_html(self):
        soup = BeautifulSoup(self.driver.page_source, HTML_PARSER)
        return soup

    def parse(self, soup):
        return self.parse_majors(soup)

    def parse_majors(self, soup):
        majors_table = list(map(lambda x: x.get_text(),
                           soup.find_all(SPAN, {CLASS_ATRIBUTE: TABLE_ROW_NAME})))
        print(majors_table)
        return majors_table

    def write(self, data, course, grad_level):
        with open(r'majors/{}/{}.csv'.format(grad_level, course), 'w') as code_file:
            writer = csv.writer(code_file)
            writer.write(data)
            code_file.close()

    def populate_json(self, course, data):
        jsondict = dict()
        try:
            jsondict["course"] = course
            jsondict["data"] = data
            return jsondict
        except TypeError and KeyError:
            self.critical_logger("KEY_ERROR || TYPE_ERROR")
            return { "INVALID_PARSE": "CHECK LOGS FOR DETAILS"}
        return jsondict

    def write(self, jsondict, grad_level, course):
        f = open(r"majors/{}/{}.json".format(grad_level, course), "w")
        json.dump(jsondict, f)
        f.close()
    # entry into the scripting here <<< read through the functions in this order
    def run(self, course, grad_level):
        self.busy = True
        self.open_page(self.get_page_url(course, grad_level))
        data = self.parse(self.fetch_page_html())
        jsondict = self.populate_json(course, data)
        self.write(jsondict, grad_level, course)
        self.busy = False

    def logger(self, code):
        delta = time.time() - self.parse_time
        self.parse_time = time.time()
        self.log.info("CODE: {} \n TIME_TAKEN: {}".format(code, delta))

    def critical_logger(self, exception):
        self.log.critical(
            "EXCEPTION {} reached, dumping subject".format(exception))


# if __name__ == '__main__':
#     scraper = MajorsScraper()
#     scraper.run()
