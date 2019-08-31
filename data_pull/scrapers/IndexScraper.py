from scrapers.Scraper import Scraper
from abc import ABC, abstractmethod
from bs4 import BeautifulSoup
from collections import defaultdict
import re
import csv
import time
import logging
import json

INDEX_PAGE = "https://handbook.unimelb.edu.au/search?query=&year=2019&types%5B%5D=subject&level_type%5B%5D=undergraduate&study_periods%5B%5D=semester_1&study_periods%5B%5D=semester_2&area_of_study=all&faculty=all&department=all&page="
# main index page, with no filters applied (every entry)
INDEX_PAGE_URL = "https://handbook.unimelb.edu.au/search?query="

# html constants
HTML_PARSER = "html.parser"
TEXT_ELEMENT = "a"
LINK_ELEMENT = "href"
CLASS_ATRIBUTE = "class"
TABLE_ROW_ELEMENT = "tr"
TABLE_ELEMENT = "table"
SPAN = "span"
PARA = "p"

# parsing constants
SUBJECT_LINK_HEADER = "search-results__accordion-title"
SUBJECT_META = "search-results__accordion-detail"
SUBJECT_CODE_ELEMENT = 1
SUBJECT_TITLE = 0
OFFERED = "<em>Offered:</em>"
YEAR_ELEMENT = '<em class="year">Year:</em>'
CONTENT = "search-results__accordion-summary"


class IndexScraper(Scraper):

    def __init__(self):
        super().__init__()
        self.data = []
        self.page = 1
        self.parse_time = time.time()
        self._get_logging_options()
        self.log = logging.getLogger("index-scraper")

    def _get_logging_options(self):
        logging.basicConfig(
            filename="logs/scraper.log", level=logging.INFO, format='%(levelname)s:%(message)s')

    @staticmethod
    def get_page_url(page):
        return "{}{}".format(INDEX_PAGE ,str(page))

    def open_page(self, page):
        super().retrieve(self.get_page_url(page))

    def fetch_page_html(self):
        self.open_page(self.page)
        soup = BeautifulSoup(self.driver.page_source, HTML_PARSER)
        return soup

    def parse(self):
        soup = self.fetch_page_html()
        self.parser(soup)

    def parser(self, soup):
        links_table = soup.find_all(TEXT_ELEMENT, attrs={CLASS_ATRIBUTE: SUBJECT_LINK_HEADER})
        meta_table = soup.find_all(SPAN, attrs={CLASS_ATRIBUTE: SUBJECT_META})
        content_table = soup.find_all(PARA, attrs={CLASS_ATRIBUTE: CONTENT})
        
        titles = list(map(lambda x: (x.contents)[SUBJECT_TITLE], links_table))
        codes = list(map(lambda x: (x.contents)[SUBJECT_CODE_ELEMENT].get_text(), links_table))
        availability = list(map(lambda x: (x.contents)[1] if x else ["Not Offered"], meta_table))
        content = list(map(lambda x: x.get_text(), content_table))

        print(list(zip(codes, titles, availability, content)))

        for i in range(len(codes)):
            self.pack(codes[i], titles[i], availability[i], content[i])

    def pack(self, code, name, availability, desc):
        jsondict = self.populate_json(code, name, availability, desc)
        print(jsondict)
        self.write(code, jsondict)

    def populate_json(self, code, name, availability, desc):
        jsondict = dict()
        try:
            with open(r'data/{}.json'.format(code), "r") as f:
                jsondict = json.load(f)
                print(jsondict)
                f.close()
        except Exception:
            print("EXCEPTION")
            jsondict = dict()
        try:
            jsondict["code"] = code
            jsondict["name"] = name
            jsondict["desc"] = desc
            jsondict["availability"] = availability
            return jsondict
        except TypeError and KeyError:
            self.critical_logger("KEY_ERROR || TYPE_ERROR")
            return {"INVALID_PARSE": "CHECK LOGS FOR DETAILS"}

    def write(self, code, jsondict):
        with open(r'undergrad_subjects/{}.json'.format(code), "w") as f:
            json.dump(jsondict, f)
            f.close()

    def run(self):
        while self.is_good_url(self.get_page_url(self.page)):
            current_codes = self.parse()
            self.page += 1
            self.parse()
        super().close()

    def logger(self, codes):
        delta = time.time() - self.parse_time
        self.parse_time = time.time()
        batch_number = self.page / 10
        
        self.log.info("BATCH {}\n TIME TAKEN: {}\n".format(
            batch_number, delta))
