from scrapers.Majors import MajorsScraper
from scrapers.MajorRequirements import MajorRequirementsScraper
from collections import deque
import time
import json


ug = "undergraduate"

def local_run():
    queue = deque()
    scraper = MajorRequirementsScraper()
    course = ""

    with open(r'majors/undergraduate/bachelor-of-biomedicine.json', 'r') as code_file:
        f = json.load(code_file)
        course = f['course']
        for item in f['data']:
            queue.append(item)

    while queue:
        if scraper.busy:
            time.sleep(2)
        else:
            major = queue.popleft().replace(" ", "-").lower()
            scraper.run("undergraduate", course, major)

if __name__ == "__main__":
    local_run()
