from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from bs4 import BeautifulSoup
from collections import defaultdict
import re
import csv
import time
import json
import logging

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


def get_page_url(subject):
  print(subject)
  return "{}/{}/{}".format(SUBJECT_PREFIX_LINK, subject, SINGLE_PAGE_SUFFIX)

def _get_logging_options():
        logging.basicConfig(
            filename="logs/scraper.log", level=logging.INFO, format='%(levelname)s:%(message)s')

def critical_logger(exception, subject):
    _get_logging_options()
    log = logging.getLogger("subject-scraper")
    log.critical("EXCEPTION {} reached, dumping subject {}".format(exception, subject))

def get_driver(address):
    # initialize options
    options = webdriver.ChromeOptions()
    # pass in headless argument to options
    options.add_argument('--headless')
    # initialize driver
    driver = webdriver.Remote(
                command_executor=f'http://{address}:4444/wd/hub',
                desired_capabilities=DesiredCapabilities.CHROME)
    return driver

def connect_to_base(browser, subject):
    base_url = get_page_url(subject=subject)
    connection_attempts = 0
    while connection_attempts < 3:
        try:
            browser.get(base_url)
            WebDriverWait(browser, 5).until(
                EC.presence_of_element_located((By.ID, PREREQ))
            )
            return True
        except Exception as ex:
            connection_attempts += 1
            print(f'Error connecting to {base_url}.')
            print(f'Attempt #{connection_attempts}.')
    return False

def fetch_page_html(driver):
    soup = BeautifulSoup(driver.page_source, HTML_PARSER)
    return soup

def parse(soup):
    overview_box = parse_overview_box(soup)
    requirements = parse_requisites(soup)
    return overview_box, requirements

def parse_overview_box(soup):
    overview_box = soup.find(TABLE_ELEMENT)
    overview_headings = map(lambda x: x.get_text(),
                            overview_box.find_all(ROW_COLUMN_HEADER))
    overview_elements = map(lambda x: x.get_text(),
                            overview_box.find_all(ROW_COLUMN_ELEMENT))
    return dict(zip(overview_headings, overview_elements))

def parse_requisites(soup):
    prereq_codes = prereq_parser(soup)
    coreq_codes = coreq_parser(soup)
    antreq_codes = antreq_parser(soup, prereq_codes)
    return {"pre": prereq_codes, "co": coreq_codes, "ant": antreq_codes}

def prereq_parser(soup):
    prereq = soup.find_all(attrs={ID: PREREQ})[PREREQ_INDEX]
    prereq_list = (prereq.find_all(attrs={DATA_LABEL: SUBJECT_CODE}))
    return list(map(lambda x: x.get_text(), prereq_list))

def coreq_parser(soup):
    coreq = soup.find_all("h3")[COREQ_INDEX]
    coreq_response = coreq.next_sibling
    return coreq_response.get_text()

def antreq_parser(soup, seen):
    antreq = soup.find_all("h3")[ANTREQ_INDEX]
    antreq_response = (antreq.next_sibling).get_text()
    if len(antreq_response) != 9 or NONE_TYPE not in antreq_response:
        antreq_response = handle_table(soup, seen)
    return antreq_response

def handle_table(soup, seen):
    subject_code_rows = soup.find_all(attrs={DATA_LABEL: SUBJECT_CODE})
    candidates = list(map(lambda x: x.get_text(), subject_code_rows))
    return list(filter(lambda x: (x not in seen), candidates))

def populate_json(overview, reqs):
    jsondict = dict()
    try:
        jsondict["year"] = overview.get(["Year of offer"], "N/A")
        jsondict["level"] = overview.get(["Subject level"], "N/A")
        jsondict["code"] = overview.get(["Subject code"], "N/A")
        jsondict["campus"] = overview.get(["Campus"], "N/A")
        jsondict["availability"] = overview.get(["Availability"], "N/A")
        jsondict["prerequisites"] = reqs.get(["pre"], "N/A")
        jsondict["corequisites"] = reqs.get(["co"], "N/A")
        jsondict["antirequisites"] = reqs.get(["ant"], "N/A")
        return jsondict
    except TypeError and KeyError:
        critical_logger("type-error", overview["Subject code"])
        return { "INVALID_PARSE": "CHECK LOGS FOR DETAILS"}
        
    return jsondict

def write(jsondict, subject):
    f = open(r"data/{}.json".format(subject), "w")
    json.dump(jsondict, f)
    f.close()

# entry into the scripting here <<< read through the functions in this order
def run(subject, address):
    browser = get_driver(address)
    if connect_to_base(browser, subject):
      print("Connection Success")
      soup = fetch_page_html(browser)
      core, reqs = parse(soup)
      data = populate_json(core, reqs)
      write(data)
      browser.quit()
      return True
    else:
      browser.quit()
      return False
    
