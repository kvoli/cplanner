from scrapers.Majors import MajorsScraper
from scrapers.MajorRequirements import MajorRequirementsScraper


scraper = MajorRequirementsScraper()
scraper.run("computing-and-software-systems")
# s = MajorsScraper()
# s.run("bachelor-of-agriculture", "undergraduate")