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
SUBJECT_PREFIX_LINK = "https://handbook.unimelb.edu.au/subjects"
REQUIREMENTS_SUFFIX = "eligibility-and-requirements"
SINGLE_PAGE_SUFFIX = "print"

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

# parsing constants
COURSE_OVERVIEW_BOX = "course__overview-box"
PREREQ = "prerequisites"
SUBJECT_CODE = "Code"
PREREQ_INDEX = 0
COREQ_INDEX = 1
ANTREQ_INDEX = 2
SUBJECT_CODE_LENGTH = 9
NONE_TYPE = "None"


class SubjectScraper(Scraper):

    def __init__(self):
        super().__init__()
        self.parse_time = time.time()
        self._get_logging_options()
        self.log = logging.getLogger("subject-scraper")
        self.busy = False

    def _get_logging_options(self):
        logging.basicConfig(
            filename="logs/scraper.log", level=logging.INFO, format='%(levelname)s:%(message)s')

    @staticmethod
    def get_page_url(subject):
        print(subject)
        return "{}/{}/{}".format(SUBJECT_PREFIX_LINK, subject, SINGLE_PAGE_SUFFIX)
    
    def is_busy(self):
        return self.busy

    def open_page(self, url):
        super().retrieve(url)

    def fetch_page_html(self):
        soup = BeautifulSoup(self.driver.page_source, HTML_PARSER)
        return soup

    def parse(self, soup):
        overview_box = self.parse_overview_box(soup)
        requirements = self.parse_requisites(soup)
        return overview_box, requirements

    def parse_overview_box(self, soup):
        overview_box = soup.find(TABLE_ELEMENT)
        overview_headings = map(lambda x: x.get_text(),
                                overview_box.find_all(ROW_COLUMN_HEADER))
        overview_elements = map(lambda x: x.get_text(),
                                overview_box.find_all(ROW_COLUMN_ELEMENT))
        return dict(zip(overview_headings, overview_elements))

    def parse_requisites(self, soup):
        prereq_codes = self.prereq_parser(soup)
        coreq_codes = self.coreq_parser(soup)
        antreq_codes = self.antreq_parser(soup, prereq_codes)
        return {"pre": prereq_codes, "co": coreq_codes, "ant": antreq_codes}

    def prereq_parser(self, soup):
        prereq = soup.find_all(attrs={ID: PREREQ})[PREREQ_INDEX]
        prereq_list = (prereq.find_all(attrs={DATA_LABEL: SUBJECT_CODE}))
        return list(map(lambda x: x.get_text(), prereq_list))

    def coreq_parser(self, soup):
        coreq = soup.find_all("h3")[COREQ_INDEX]
        coreq_response = coreq.next_sibling
        try: 
            return coreq_response.get_text()
        except AttributeError:
            self.critical_logger("Attribute-Error")


    def antreq_parser(self, soup, seen):
        antreq = soup.find_all("h3")[ANTREQ_INDEX]
        antreq_response = (antreq.next_sibling).get_text()
        if len(antreq_response) != 9 or NONE_TYPE not in antreq_response:
            antreq_response = self.handle_table(soup, seen)
        return antreq_response

    def handle_table(self, soup, seen):
        subject_code_rows = soup.find_all(attrs={DATA_LABEL: SUBJECT_CODE})
        candidates = list(map(lambda x: x.get_text(), subject_code_rows))
        return list(filter(lambda x: (x not in seen), candidates))

    def populate_json(self, overview, reqs):
        jsondict = dict()
        try:
            jsondict["year"] = overview["Year of offer"]
            jsondict["level"] = overview["Subject level"]
            jsondict["code"] = overview["Subject code"]
            jsondict["campus"] = overview["Campus"]
            jsondict["availability"] = overview["Availability"]
            jsondict["prerequisites"] = reqs["pre"]
            jsondict["corequisites"] = reqs["co"]
            jsondict["antirequisites"] = reqs["ant"]
            return jsondict
        except TypeError and KeyError:
            self.critical_logger("KEY_ERROR || TYPE_ERROR")
            return { "INVALID_PARSE": "CHECK LOGS FOR DETAILS"}
        return jsondict

    def write(self, jsondict, subject):
        f = open(r"data/{}.json".format(subject), "w")
        json.dump(jsondict, f)
        f.close()

    # entry into the scripting here <<< read through the functions in this order
    def run(self, subject):
        self.busy = True
        url = self.get_page_url(subject)
        self.open_page(url)
        soup = self.fetch_page_html()
        core, reqs = self.parse(soup)
        print(core, reqs)
        jsondict = self.populate_json(core, reqs)
        self.write(jsondict, subject)
        self.busy = False

    def logger(self, code):
        delta = time.time() - self.parse_time
        self.parse_time = time.time()
        self.log.info("CODE: {} \n TIME_TAKEN: {}".format(code, delta))
    
    def critical_logger(self, exception):
        self.log.critical("EXCEPTION {} reached, dumping subject".format(exception))
