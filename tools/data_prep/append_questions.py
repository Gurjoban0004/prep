import os
import re

# Resolve paths relative to the project root (which is two directories up from this script)
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(os.path.dirname(script_dir))

data_file_path = os.path.join(project_root, 'IOT', 'java-data.js')
exam_file_path = os.path.join(project_root, 'exam_questions.js')
tp_file_path = os.path.join(project_root, 'testpad_questions.js')

# Read original java-data.js
with open(data_file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Read new questions
with open(exam_file_path, 'r', encoding='utf-8') as f:
    exam_questions = f.read()

with open(tp_file_path, 'r', encoding='utf-8') as f:
    tp_questions = f.read()

# Find the end of the array (last '];' before const JAVA_SECTIONS)
pattern = r'(\n\s*\}\n*\];?\n*)(?=\n*// Section metadata for sidebar grouping)'
match = re.search(pattern, content)

if match:
    end_index = match.start(0)
    
    # We want to replace the closing '];' with:
    # ,
    # <exam_questions>
    # ,
    # <tp_questions>
    # ];
    replacement = ",\n\n" + exam_questions + ",\n\n" + tp_questions + "\n];\n"
    
    new_content = content[:end_index] + replacement + content[match.end(1):]
    
    with open(data_file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESSFULLY APPENDED NEW PROBLEMS")
else:
    print("ERROR: COULD NOT FIND ARRAY END PATTERN")
