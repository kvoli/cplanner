from scrapers.IndexScraper import IndexScraper
from collections import deque
import csv
import os
import time
import json
import sys


def local_run():
  scraper = IndexScraper()
  scraper.run()

if __name__ == "__main__":
    local_run()



