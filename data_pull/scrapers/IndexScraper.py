from scrapers.Scraper import Scraper
from abc import ABC, abstractmethod
from bs4 import BeautifulSoup
from collections import defaultdict
import re
import csv
import time
import logging

# main index page, with no filters applied (every entry)
INDEX_PAGE_URL = "https://handbook.unimelb.edu.au/search?query="

# html constants
HTML_PARSER = "html.parser"
TEXT_ELEMENT = "a"
LINK_ELEMENT = "href"
CLASS_ATRIBUTE = "class"
TABLE_ROW_ELEMENT = "tr"
TABLE_ELEMENT = "table"

# parsing constants
SUBJECT_LINK_HEADER = "search-results__accordion-title"
SUBJECT_CODE_ELEMENT = 1

# 404 Error Code
ERROR_404_PAGE = 404


class IndexScraper(Scraper):

    def __init__(self):
        super().__init__(self.get_page_url(1))
        self.data = []
        self.page = 2
        self.parse_time = time.time()
        self._get_logging_options()
        self.log = logging.getLogger("index-scraper")

    def _get_logging_options(self):
        logging.basicConfig(
            filename="data_pull/logs/scraper.log", level=logging.INFO, format='%(levelname)s:%(message)s')

    @staticmethod
    def get_page_url(page):
        return "https://handbook.unimelb.edu.au/2019/search?query=&faculty=all&department=all&year=2019&area_of_study=all&types%5B%5D=subject&level_type%5B%5D=all&study_periods%5B%5D=all&sort=external_code%7Casc&page={}".format(str(page))

    def open_page(self, page):
        super().retrieve(self.get_page_url(page))

    def fetch_page_html(self):
        self.open_page(self.page)
        soup = BeautifulSoup(self.driver.page_source, HTML_PARSER)
        return soup.find_all(TEXT_ELEMENT, {CLASS_ATRIBUTE: SUBJECT_LINK_HEADER})

    def parse(self):
        links_table = self.fetch_page_html()
        codes = []
        for link in links_table:
            codes.append(link.contents[SUBJECT_CODE_ELEMENT].get_text())
        self.data.extend(codes)
        return codes

    def write(self):
        self.logger(self.data)
        with open(r'data_pull/data/codes.csv', 'a') as code_file:
            writer = csv.writer(code_file)
            writer.writerow(self.data)
            code_file.close()
        self.data.clear()

    def run(self):
        while self.is_good_url(self.get_page_url(self.page)):
            current_codes = self.parse()
            self.page += 1
            if self.page % 10 == 0:
                self.write()
        self.write()
        super().close()

    def logger(self, codes):
        parse_time_taken = time.time() - self.parse_time
        batch_number = self.page / 10
        self.log.info("BATCH {}\n TIME TAKEN: {}\n".format(
            batch_number, parse_time_taken))
