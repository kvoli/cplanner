from scrapers.FunctionalScraper import *
from scrapers.SubjectScraper import SubjectScraper
from collections import deque
import csv
import os
import time
import json
import sys

def pull_subjects(address):
    
    queue = deque()
    
    with open(r'data/codes.csv', 'r') as code_file:
        reader = csv.reader(code_file)
        for row in reader:
            queue += row
        code_file.close()
        
    while queue:
        code = queue.popleft()
        run(code, address)


def local_run():
    queue = deque()
    scraper = SubjectScraper()
    
    with open(r'data/codes.csv', 'r') as code_file:
        reader = csv.reader(code_file)
        for row in reader:
            queue += row
        code_file.close()
        
    while queue:
        if scraper.busy:
            time.sleep(2)
        else:
            scraper.run(queue.popleft())



if __name__ == "__main__":
    local_run()



