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
        code_file.close()
        course = f['course']
        for item in f['data']:
            queue.append(item)

    while queue:
        if scraper.busy:
            time.sleep(2)
        else:
            code_file.close()
            major = queue.popleft().replace(" ", "-").lower()
            current_data = scraper.run("undergraduate", course, major)
            f[major] = current_data
    
    with open(r'majors/bachelor-of-biomedicine.json', 'w') as code_file:
        json.dump(f, code_file)
        code_file.close()


if __name__ == "__main__":
    local_run()
