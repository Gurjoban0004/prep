#!/usr/bin/env python3
"""
Builds IOT/java_abstractions-data.js — the study notes for
Programming Abstractions using JAVA (24CSE0314).

Content follows the official Chitkara CHO lecture plan:
  ST-1      lectures 1-14   Java core, collections, streams, JVM
  ST-2      lectures 15-27  SQL, JDBC, DAO, CRUD
  End Term  lectures 28-30  multithreading and concurrency
  Lab       experiments 1-60

The notes themselves live in java_pa_content_*.py next to this file.

Run:  python3 tools/data_prep/generate_java_abstractions_subject.py
"""

import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
sys.path.insert(0, str(HERE))

from java_pa_content_st1 import ST1          # noqa: E402
from java_pa_content_st2 import ST2          # noqa: E402
from java_pa_content_end import END_TERM     # noqa: E402
from java_pa_content_lab import LAB          # noqa: E402
from java_pa_content_mcq import MCQ_BANK     # noqa: E402

IOT_DIR = ROOT / "IOT"

# Keep the handout filed next to the subject it produced.
INTAKE_DIR = ROOT / "resources" / "course_intake" / "java_abstractions"
INTAKE_DIR.mkdir(parents=True, exist_ok=True)
PDF_SOURCE = ROOT / "resources" / "course_intake" / "CHO of Programming Abstractions using Java(24CSE0314).pdf"
PDF_DEST = INTAKE_DIR / "CHO_Programming_Abstractions_Java.pdf"
if PDF_SOURCE.exists() and not PDF_DEST.exists():
    PDF_DEST.write_bytes(PDF_SOURCE.read_bytes())

# app.js reads data[section] as a flat list of {title, subtitle, html}.
STUDY_DATA = {
    "st1": ST1,
    "st2": ST2,
    "endTerm": END_TERM,
    "lab": LAB,
}


def main():
    target = IOT_DIR / "java_abstractions-data.js"

    ids = [q["id"] for unit in MCQ_BANK for q in unit["questions"]]
    duplicates = {i for i in ids if ids.count(i) > 1}
    if duplicates:
        raise SystemExit(f"Duplicate MCQ ids: {sorted(duplicates)}")

    for section, topics in STUDY_DATA.items():
        for t in topics:
            missing = {"title", "html"} - t.keys()
            if missing:
                raise SystemExit(f"{section}: topic missing {missing}")

    js = (
        "// Programming Abstractions using JAVA (24CSE0314)\n"
        "// Generated from the official CHO by tools/data_prep/generate_java_abstractions_subject.py\n"
        "// Edit the java_pa_content_*.py files and re-run the generator, not this file.\n\n"
        f"const JAVA_ABSTRACTIONS_STUDY_DATA = {json.dumps(STUDY_DATA, indent=2, ensure_ascii=False)};\n\n"
        f"const JAVA_ABSTRACTIONS_MCQ_BANK = {json.dumps(MCQ_BANK, indent=2, ensure_ascii=False)};\n"
    )
    target.write_text(js, encoding="utf-8")

    counts = " | ".join(f"{k}: {len(v)}" for k, v in STUDY_DATA.items())
    print(f"Built {target}")
    print(f"  topics    {counts}")
    print(f"  questions {len(ids)} across {len(MCQ_BANK)} quizzes")


if __name__ == "__main__":
    main()
