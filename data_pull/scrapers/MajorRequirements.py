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
ROLE =  "role"
CELL = "cell"

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

PLAN_SEMESTER = "sample-plan__semester"
SEMESTER_CLASS_LIST = "sample-plan__semester"
OVERALL_PLAN = "sample-plan__years"

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
        print(url)
        super().retrieve(url)

    def fetch_page_html(self):
        soup = BeautifulSoup(self.driver.page_source, HTML_PARSER)
        return soup

    def parse(self, soup):
        keys = self.get_keys(soup)
        slots = self.get_all_classes(soup)
        return keys, slots

    def get_keys(self, soup):
        return list(set(map(lambda x: x.get_text(), soup.find_all(SPAN, attrs={
                                 CLASS_ATRIBUTE: PLAN_KEY_ELEMENT}))))
    
    def get_all_classes(self, soup):
        print("here")
        counter = 0
        res = defaultdict(list)
        semesters = soup.find_all(attrs={CLASS_ATRIBUTE: "sample-plan__subjects"})
        for semester in semesters:
            splits = semester.find_all('li')
            for course in splits:
                print("inner here")
                slot_type = course.find(title=True)
                slot = slot_type.contents[0]
                print(slot)
                code = course.find(SPAN, {CLASS_ATRIBUTE: "sample-plan__subject-code"})
                check = code if code else [None]
                res[slot]+=check
        return res

    def populate_json(self, keys, slots):
        jsondict = dict()
        try:
            jsondict["slots"] = slots
            jsondict["keys"] = keys
            return jsondict
        except TypeError and KeyError:
            self.critical_logger("KEY_ERROR || TYPE_ERROR")
            return {"INVALID_PARSE": "CHECK LOGS FOR DETAILS"}
        return jsondict

    def write(self, jsondict, grad_level, course, major):
        f = open(r"majors/{}/{}/{}.json".format(grad_level, course, major), "w")
        json.dump(jsondict, f)
        f.close()

    # entry into the scripting here <<< read through the functions in this order
    def run(self, grad_level, course, major):
        self.busy = True
        self.open_page(self.get_page_url(major))
        keys, slots = self.parse(self.fetch_page_html())
        jsondict = self.populate_json(keys, slots)
        print(jsondict)
        self.write(jsondict, grad_level, course, major)
        self.busy = False

    def logger(self, code):
        delta = time.time() - self.parse_time
        self.parse_time = time.time()
        self.log.info("CODE: {} \n TIME_TAKEN: {}".format(code, delta))

    def critical_logger(self, exception):
        self.log.critical(
            "EXCEPTION {} reached, dumping subject".format(exception))
