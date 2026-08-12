#!/usr/bin/env python3
"""
Automated Course Handout Ingestion Tool for Prep Hub.

Usage:
    python3 tools/data_prep/build_subject_from_handout.py --id dbms --label "Database Management Systems" --short "DBMS"
"""

import argparse
import sys
import re
import json
from pathlib import Path

# Add data_prep directory to python path to import parse_notes helpers
CURRENT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(CURRENT_DIR))

try:
    from parse_notes import parse_markdown_to_html
except ImportError:
    # Fallback inline markdown converter if parse_notes cannot be loaded
    def parse_markdown_to_html(lines):
        return ["<p>" + line.strip() + "</p>" for line in lines if line.strip()]

DEFAULT_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>'

def parse_markdown_notes(content, default_label):
    """
    Parses a markdown notes file formatted with:
    # Unit Name
    ## Topic Title
    Content...
    """
    lines = content.splitlines()
    units = {}
    current_unit_key = "unit1"
    current_unit_name = f"Unit 1 — Introduction to {default_label}"
    current_topic_title = None
    current_topic_lines = []

    units[current_unit_key] = {
        "unitName": current_unit_name,
        "topics": []
    }

    def flush_topic():
        nonlocal current_topic_title, current_topic_lines
        if current_topic_title and current_topic_lines:
            html_content = "".join(parse_markdown_to_html(current_topic_lines))
            units[current_unit_key]["topics"].append({
                "title": current_topic_title,
                "content": html_content
            })
            current_topic_lines = []
            current_topic_title = None

    unit_counter = 1
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("# "):
            flush_topic()
            unit_name_text = stripped[2:].strip()
            current_unit_key = f"unit{unit_counter}"
            current_unit_name = unit_name_text
            unit_counter += 1
            units[current_unit_key] = {
                "unitName": current_unit_name,
                "topics": []
            }
        elif stripped.startswith("## "):
            flush_topic()
            current_topic_title = stripped[3:].strip()
        else:
            if current_topic_title is not None:
                current_topic_lines.append(line)

    flush_topic()
    return units

def parse_mcq_markdown(content, default_label):
    """
    Parses a markdown MCQ file into structured quiz objects.
    Format:
    1. Question text
    - a) Option A
    - b) Option B
    - c) Option C
    - d) Option D
    Correct: a
    Explanation: Why a is correct
    """
    blocks = re.split(r'\n(?=\d+\.|\*\*Question)', content)
    questions = []
    start_id = 5001

    for block in blocks:
        lines = [l.strip() for l in block.splitlines() if l.strip()]
        if not lines:
            continue

        q_match = re.match(r'^(?:\d+\.|\*\*Question:?\*\*)\s*(.*)', lines[0])
        if not q_match:
            continue

        q_text = q_match.group(1).strip()
        options = {}
        correct_letter = "a"
        explanation = f"Standard question for {default_label}."

        for line in lines[1:]:
            opt_match = re.match(r'^[-*+]\s*([a-d])\)\s*(.*)', line, re.IGNORECASE)
            if opt_match:
                options[opt_match.group(1).lower()] = opt_match.group(2).strip()

            correct_match = re.match(r'^(?:Correct|Answer):\s*([a-d])', line, re.IGNORECASE)
            if correct_match:
                correct_letter = correct_match.group(1).lower()

            exp_match = re.match(r'^Explanation:\s*(.*)', line, re.IGNORECASE)
            if exp_match:
                explanation = exp_match.group(1).strip()

        if len(options) >= 2:
            questions.append({
                "id": start_id,
                "topic": "General Practice",
                "question": q_text,
                "options": options,
                "correct": correct_letter,
                "explanation": explanation
            })
            start_id += 1

    return [{
        "unitName": f"{default_label} MCQ Quiz",
        "examGroup": "practice",
        "questions": questions
    }]

def generate_default_scaffold(subject_id, label):
    study_data = {
        "unit1": {
            "unitName": f"Unit 1 — Introduction to {label}",
            "topics": [
                {
                    "title": f"Getting Started with {label}",
                    "content": f"<h3>Core Fundamentals of {label}</h3><p>Detailed notes for {label} will be loaded here.</p>"
                }
            ]
        }
    }
    mcq_bank = [
        {
            "unitName": f"{label} Practice Quiz",
            "examGroup": "practice",
            "questions": [
                {
                    "id": 9001,
                    "topic": "Fundamentals",
                    "question": f"Which concept is essential in {label}?",
                    "options": {
                        "a": "Core Principles",
                        "b": "Deprecated Legacy Syntax",
                        "c": "Unrelated Modules",
                        "d": "None of the above"
                    },
                    "correct": "a",
                    "explanation": f"Core principles form the bedrock of {label}."
                }
            ]
        }
    ]
    return study_data, mcq_bank

def update_app_js_config(subject_id, label, short_label, icon, script_file, units_dict):
    app_js_path = Path(__file__).resolve().parent.parent.parent / "IOT" / "app.js"
    if not app_js_path.exists():
        print(f"Warning: {app_js_path} not found.")
        return

    content = app_js_path.read_text(encoding="utf-8")
    
    # Check if subject is already in CONFIG.subjects
    if f"    {subject_id}: {{" in content:
        print(f"✓ Subject {subject_id} is already registered in CONFIG.subjects in app.js")
        return

    # Build sectionNames and tabs dynamically based on units
    section_names = {}
    tabs = []
    theme_colors = {}
    palette = ['#5F7AE0', '#81B29A', '#B58A3D', '#3A8F65', '#8A5F9E', '#9E5F5F']

    for idx, (unit_key, unit_val) in enumerate(units_dict.items()):
        section_names[unit_key] = unit_val.get("unitName", unit_key.upper())
        tabs.append({"id": unit_key, "label": unit_key.upper()})
        theme_colors[unit_key] = palette[idx % len(palette)]

    section_names["practice"] = "Topic-Wise MCQs"
    tabs.append({"id": "practice", "label": "MCQs"})
    theme_colors["practice"] = "#8C4735"

    config_entry = f"""    {subject_id}: {{
      label: {json.dumps(label)},
      shortLabel: {json.dumps(short_label)},
      icon: {json.dumps(icon)},
      examTime: null,
      storageKey: "{subject_id}_mastered_topics",
      storageKeyPractice: "{subject_id}_mcq_answers",
      scripts: [{json.dumps(script_file)}],
      data: {{}},
      mcqs: null,
      themeColors: {json.dumps(theme_colors, indent=8)},
      sectionNames: {json.dumps(section_names, indent=8)},
      tabs: {json.dumps(tabs, indent=8)}
    }},
"""

    target_insertion = "  subjects: {\n"
    if target_insertion in content:
        new_content = content.replace(target_insertion, target_insertion + config_entry)
        app_js_path.write_text(new_content, encoding="utf-8")
        print(f"✓ Successfully registered {subject_id} in CONFIG.subjects in IOT/app.js!")
    else:
        print(f"Could not locate insertion point in app.js. Add manually:\n{config_entry}")

def main():
    parser = argparse.ArgumentParser(description="Ingest course materials for a subject into Prep Hub.")
    parser.add_argument("--id", required=True, help="Subject ID (lowercase, e.g., dbms, python)")
    parser.add_argument("--label", required=True, help="Full display label (e.g., 'Database Management Systems')")
    parser.add_argument("--short", help="Short label for navigation buttons. Defaults to --label.")
    parser.add_argument("--icon", default=DEFAULT_ICON, help="SVG icon string")

    args = parser.parse_args()

    subject_id = args.id.lower().strip()
    label = args.label.strip()
    short_label = (args.short or label).strip()
    upper_id = subject_id.upper()
    script_file = f"{subject_id}-data.js"

    intake_dir = Path(__file__).resolve().parent.parent.parent / "resources" / "course_intake" / subject_id
    iot_dir = Path(__file__).resolve().parent.parent.parent / "IOT"
    target_data_file = iot_dir / script_file

    notes_file = intake_dir / "notes.md"
    mcqs_file = intake_dir / "mcqs.md"
    json_mcqs_file = intake_dir / "mcqs.json"

    study_data = None
    mcq_bank = None

    if notes_file.exists():
        print(f"Found notes: {notes_file}")
        study_data = parse_markdown_notes(notes_file.read_text(encoding="utf-8"), label)
    
    if mcqs_file.exists():
        print(f"Found MCQs: {mcqs_file}")
        mcq_bank = parse_mcq_markdown(mcqs_file.read_text(encoding="utf-8"), label)
    elif json_mcqs_file.exists():
        print(f"Found JSON MCQs: {json_mcqs_file}")
        try:
            mcq_bank = json.loads(json_mcqs_file.read_text(encoding="utf-8"))
        except Exception as e:
            print(f"Warning: Could not parse JSON MCQs: {e}")

    if not study_data or not mcq_bank:
        default_study, default_mcqs = generate_default_scaffold(subject_id, label)
        study_data = study_data or default_study
        mcq_bank = mcq_bank or default_mcqs

    # Write IOT/{subject_id}-data.js
    js_output = f"""// {label} ({subject_id}) Subject Data & MCQs
// Built automatically by tools/data_prep/build_subject_from_handout.py

const {upper_id}_STUDY_DATA = {json.dumps(study_data, indent=2)};

const {upper_id}_MCQ_BANK = {json.dumps(mcq_bank, indent=2)};
"""

    target_data_file.write_text(js_output, encoding="utf-8")
    print(f"✓ Successfully built: {target_data_file}")

    # Register in app.js
    update_app_js_config(subject_id, label, short_label, args.icon, script_file, study_data)

if __name__ == "__main__":
    main()
