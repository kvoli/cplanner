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
MAJOR_PREFIX = "https://study.unimelb.edu.au/find/courses/major"
REQUIREMENTS_SUFFIX = "eligibility-and-requirements"
URL_SUFFIX = "what-will-i-study"



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
UNORDERED_LIST = "ul"
SPAN = "span"
LABEL = "aria-label"
PARAGRAPH = "p"
LIST_CONTAINER = "li"

# parsing constants
PLAN_KEY_TABLE = "sample-plan__legend-keys"
PLAN_KEY_ELEMENT = "sample-plan__legend-key-label"
YEAR_1 = "year Year 1"
YEAR_2 = "year Year 2"
YEAR_3 = "year Year 3"

MAJOR_CORE_PREREQUISITE = "sample-plan__subject sample-plan__subject--major core prerequisite"
SCIENCE_ELECTIVE = "sample-plan__subject sample-plan__subject--science elective"
BREADTH = "sample-plan__subject sample-plan__subject--breadth"
SCIENCE_BREADTH = "sample-plan__subject sample-plan__subject--science elective"
MAJOR_CORE = "sample-plan__subject sample-plan__subject--major core"
MAJOR_ELECTIVE_PREREQUISITE = "sample-plan__subject sample-plan__subject--major elective prerequisite"
MAJOR_ELECTIVE = "sample-plan__subject sample-plan__subject--major elective"
RECOMMENDED = "sample-plan__subject sample-plan__subject--recommended"


class MajorRequirementsScraper(Scraper):

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
    def get_page_url(major):
        return "{}/{}/{}".format(MAJOR_PREFIX, major, URL_SUFFIX)

    def is_busy(self):
        return self.busy

    def open_page(self, url):
        super().retrieve(url)

    def fetch_page_html(self):
        soup = BeautifulSoup(self.driver.page_source, HTML_PARSER)
        return soup

    def parse(self, soup):
        keys = self.get_keys(soup)
        self.get_semesters(keys, soup)

    def get_keys(self, soup):
        return list(set(map(lambda x: x.get_text(), soup.find_all(SPAN, attrs={
                                 CLASS_ATRIBUTE: PLAN_KEY_ELEMENT}))))

    def get_semesters(self, keys, soup):
        year_one = soup.find(attrs={LABEL: YEAR_1})
        print(year_one)
        self.get_semester_classes(year_one, keys)
    
    def get_semester_classes(self, year, keys):
        codes = year.find_all(PARAGRAPH)
        print(codes)
        
                    
    def populate_json(self, overview, reqs):
        jsondict = dict()
        try:
            return jsondict
        except TypeError and KeyError:
            self.critical_logger("KEY_ERROR || TYPE_ERROR")
            return {"INVALID_PARSE": "CHECK LOGS FOR DETAILS"}
        return jsondict

    def write(self, jsondict, subject):
        f = open(r"data/{}.json".format(subject), "w")
        json.dump(jsondict, f)
        f.close()

    # entry into the scripting here <<< read through the functions in this order
    def run(self, major):
        self.busy = True
        self.open_page(self.get_page_url(major))
        self.parse(self.fetch_page_html())
        super().close()
        self.busy = False

    def logger(self, code):
        delta = time.time() - self.parse_time
        self.parse_time = time.time()
        self.log.info("CODE: {} \n TIME_TAKEN: {}".format(code, delta))

    def critical_logger(self, exception):
        self.log.critical(
            "EXCEPTION {} reached, dumping subject".format(exception))
