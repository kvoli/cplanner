from scrapers.Scraper import Scraper
from abc import ABC, abstractmethod
from bs4 import BeautifulSoup
from collections import defaultdict
import re
import csv
import time
import logging

# main index page, with no filters applied (every entry)
SUBJECT_PREFIX_LINK = "https://handbook.unimelb.edu.au/subjects"
REQUIREMENTS_SUFFIX = "eligibility-and-requirements"
SINGLE_PAGE_SUFFIX = "print"


# JSON SCHEMA ==
#     { subjects: { ....
#                 COMP10001: {
#                             subjectCode: "COMP10001",
#                             points: 12.5,
#                             prereq: [],
#                             coreq: [],
#                             antireq: [],
#                             location: "Parkville"
#                             semone: boolean,
#                             semtwo: boolean,
#                             yrlong: boolean,
#                             summer: boolean,
#                             winter: boolean,
#                             },
#                 COMP10002: {
#                             subjectCode: "COMP10001",
#                             points: 12.5,
#                             prereq: [],
#                             coreq: [],
#                             antireq: [],
#                             location: "Parkville"
#                             semone: boolean,
#                             semtwo: boolean,
#                             yrlong: boolean,
#                             summer: boolean,
#                             winter: boolean,
#                             },
#                 ...
#             }
#     }


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

# 404 Error Code
ERROR_404_PAGE = 404


class SubjectScraper(Scraper):

    def __init__(self, subject):
        super().__init__(self.get_page_url(subject))
        self.data = []

    @staticmethod
    def get_page_url(subject):
        print(subject)
        return "{}/{}/{}".format(SUBJECT_PREFIX_LINK, subject, SINGLE_PAGE_SUFFIX)

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
        antreq_codes = self.antreq_parser(soup)
        return { "pre": prereq_codes, "co": coreq_codes, "ant": antreq_codes }

    def prereq_parser(self, soup):
        prereq = soup.find_all(attrs={ID: PREREQ})[PREREQ_INDEX]
        prereq_list = (prereq.find_all(attrs={DATA_LABEL: SUBJECT_CODE}))
        return list(map(lambda x: x.get_text(), prereq_list))

    def coreq_parser(self, soup):
        coreq = soup.find_all("h3")[COREQ_INDEX]
        coreq_response = coreq.next_sibling
        return coreq_response.get_text()
    
    def antreq_parser(self, soup):
        antreq = soup.find_all("h3")[ANTREQ_INDEX]
        antreq_response = antreq.next_sibling
        return antreq_response.get_text()

    def write(self):
        pass

    def run(self, subject):
        url = self.get_page_url(subject)
        self.open_page(url)
        soup = self.fetch_page_html()
        res = self.parse(soup)
        print(res)

    def logger(self, codes):
        pass
