import os
import json

subjects_listdir = os.listdir("undergrad_subjects")

subjects = dict()
subject_list = []


for subject in subjects_listdir:
    with open(r"undergrad_subjects/{}".format(subject), 'r') as code_file:
        f = json.load(code_file)
        subject_list.append(f)
        subjects[subject[:-5]] = f
        code_file.close()
        print(subject[:-5])

with open(r"subjects_dict.json", 'w') as drop:
    json.dump(subjects, drop)
    drop.close()

with open(r"subjects_list.json", 'w') as dropper:
  json.dump(subject_list, dropper)
  dropper.close()
