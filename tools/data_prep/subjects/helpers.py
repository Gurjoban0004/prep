"""Shared building blocks for subject notes.

Write code inside <pre><code> and inline <code> as plain source: topic() HTML-escapes
it, so `List<Integer>` and `a && b` need no entities (existing entities are tolerated).
"""

import html
import re

_CODE = re.compile(r"(<code[^>]*>)(.*?)(</code>)", re.S)


def _escape_code(markup):
    # unescape first so an accidental &lt; inside code isn't double-escaped
    return _CODE.sub(lambda m: m.group(1) + html.escape(html.unescape(m.group(2)), quote=False) + m.group(3), markup)


def topic(title, subtitle, body, foundations=None):
    res = {"title": title, "subtitle": subtitle, "html": _escape_code(body.strip())}
    if foundations:
        res["foundationsHtml"] = _escape_code(foundations.strip())
    return res


def check(question, options, correct, why):
    """An inline quick-check question. Answers are not saved (notes, not the quiz bank)."""
    letters = "abcd"
    opts = "".join(
        f'<button type="button" class="mcq-option" data-option="{letters[i]}">'
        f'<span class="option-letter">{letters[i].upper()}</span><span class="option-text">{text}</span></button>'
        for i, text in enumerate(options)
    )
    return (
        '<div class="mcq-card quick-check"><div class="mcq-card-header"><div class="mcq-kicker">'
        '<span class="mcq-num">Quick check</span></div></div>'
        f'<div class="mcq-question">{question}</div>'
        f'<div class="mcq-options" data-correct="{correct}">{opts}</div>'
        f'<div class="mcq-explanation" style="display:none"><strong>Why:</strong> {why}</div></div>'
    )


def q(qid, topic_name, question, options, correct, explanation):
    """Quiz bank entries are plain text; the quiz page inserts them as HTML, so escape here."""
    letters = "abcd"
    assert len(options) == 4 and correct in letters, qid
    esc = lambda s: html.escape(s, quote=False)
    return {
        "id": qid,
        "topic": topic_name,
        "question": esc(question),
        "options": {letters[i]: esc(o) for i, o in enumerate(options)},
        "correct": correct,
        "explanation": esc(explanation),
    }


def quiz(name, group, questions):
    return {"unitName": name, "examGroup": group, "questions": questions}
