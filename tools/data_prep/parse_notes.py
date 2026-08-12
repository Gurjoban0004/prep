import re
import json
import os

def escape_html(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def inline_formatting(text):
    # Escape HTML first
    text = escape_html(text)
    # Bold-italic: ***text***
    text = re.sub(r'\*\*\*(.*?)\*\*\*', r'<strong><em>\1</em></strong>', text)
    # Bold: **text**
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
    # Italic: *text*
    text = re.sub(r'\*(.*?)\*', r'<em>\1</em>', text)
    # Inline code: `code`
    text = re.sub(r'`(.*?)`', r'<code>\1</code>', text)
    return text

def parse_markdown_to_html(lines):
    html_out = []
    i = 0
    n = len(lines)
    
    while i < n:
        line = lines[i]
        stripped = line.strip()
        
        # 1. Code block
        if stripped.startswith('```'):
            lang = stripped[3:].strip()
            code_lines = []
            i += 1
            while i < n and not lines[i].strip().startswith('```'):
                code_lines.append(lines[i])
                i += 1
            code_text = escape_html(''.join(code_lines))
            html_out.append(f'<pre><code class="language-{lang}">{code_text}</code></pre>')
            i += 1
            continue
            
        # 2. Blockquote
        if stripped.startswith('>'):
            quote_lines = []
            while i < n and lines[i].strip().startswith('>'):
                q_line = lines[i].strip()[1:].strip()
                quote_lines.append(q_line)
                i += 1
            
            quote_content = '<br>'.join([inline_formatting(ql) for ql in quote_lines])
            
            # Callout types based on content
            if '⚠️' in quote_content:
                html_out.append(f'<div class="callout callout-warning">{quote_content}</div>')
            elif '🔑' in quote_content:
                html_out.append(f'<div class="callout callout-key">{quote_content}</div>')
            elif '💡' in quote_content or 'Tip:' in quote_content:
                html_out.append(f'<div class="callout callout-tip">{quote_content}</div>')
            else:
                html_out.append(f'<div class="callout">{quote_content}</div>')
            continue
            
        # 3. Table
        if stripped.startswith('|'):
            table_rows = []
            while i < n and lines[i].strip().startswith('|'):
                table_rows.append(lines[i].strip())
                i += 1
                
            if len(table_rows) > 0:
                html_out.append('<table>')
                # Check for header divider row
                has_header = len(table_rows) > 1 and '---|' in table_rows[1]
                
                start_row = 0
                if has_header:
                    # Parse header
                    header_cells = [c.strip() for c in table_rows[0].split('|')[1:-1]]
                    html_out.append('<thead><tr>')
                    for cell in header_cells:
                        html_out.append(f'<th>{inline_formatting(cell)}</th>')
                    html_out.append('</tr></thead>')
                    html_out.append('<tbody>')
                    start_row = 2 # skip header and divider
                else:
                    html_out.append('<tbody>')
                    
                for r in range(start_row, len(table_rows)):
                    cells = [c.strip() for c in table_rows[r].split('|')[1:-1]]
                    html_out.append('<tr>')
                    for cell in cells:
                        html_out.append(f'<td>{inline_formatting(cell)}</td>')
                    html_out.append('</tr>')
                html_out.append('</tbody></table>')
            continue
            
        # 4. Horizontal rule
        if stripped == '---':
            html_out.append('<hr>')
            i += 1
            continue
            
        # 5. Headings
        if stripped.startswith('#### '):
            html_out.append(f'<h4>{inline_formatting(stripped[5:])}</h4>')
            i += 1
            continue
        if stripped.startswith('### '):
            html_out.append(f'<h3>{inline_formatting(stripped[4:])}</h3>')
            i += 1
            continue
        if stripped.startswith('## '):
            # This shouldn't normally happen inside a topic body since ## is the topic separator,
            # but in case it does, we map it to h2
            html_out.append(f'<h2>{inline_formatting(stripped[3:])}</h2>')
            i += 1
            continue

        # MCQ Card Parser (custom block for practice MCQs)
        mcq_match = re.match(r'^(\d+)\.\s+(.*)', stripped)
        if mcq_match:
            is_mcq = False
            peek_idx = i + 1
            while peek_idx < n and lines[peek_idx].strip() == '':
                peek_idx += 1
            if peek_idx < n:
                peek_stripped = lines[peek_idx].strip()
                if any(peek_stripped.startswith(p) for p in ('- a)', '- b)', '- c)', '- d)', '- a) ', '- b) ', '- c) ', '- d) ')):
                    is_mcq = True
            
            if is_mcq:
                q_num = mcq_match.group(1)
                q_text = inline_formatting(mcq_match.group(2))
                options = []
                correct_letter = None
                
                i += 1
                while i < n:
                    curr_line = lines[i]
                    curr_stripped = curr_line.strip()
                    if curr_stripped == '':
                        i += 1
                        continue
                    
                    opt_match = re.match(r'^[-*+]\s+([a-d])\)\s+(.*)', curr_stripped, re.IGNORECASE)
                    if opt_match:
                        opt_letter = opt_match.group(1).lower()
                        opt_text = opt_match.group(2).strip()
                        
                        is_correct = '✓' in opt_text or '✓' in curr_stripped
                        if is_correct:
                            correct_letter = opt_letter
                        
                        clean_text = opt_text
                        opt_explanation = ""
                        
                        if is_correct:
                            # Try to extract explanation after ** ... ✓**
                            expl_match = re.match(r'^\*\*(.*?)\s*✓\s*\*\*\s*(.*)', opt_text)
                            if expl_match:
                                clean_text = expl_match.group(1).strip()
                                opt_explanation = expl_match.group(2).strip()
                            else:
                                clean_text = opt_text.replace('✓', '').replace('**', '').strip()
                        else:
                            clean_text = opt_text.replace('**', '').strip()

                        if opt_explanation:
                            # Clean up leading/trailing parentheses or italics markers
                            opt_explanation = re.sub(r'^[\*\(\s]+|[\*\)\s]+$', '', opt_explanation).strip()
                            
                        options.append({
                            'letter': opt_letter,
                            'text': inline_formatting(clean_text),
                            'explanation': opt_explanation
                        })
                        i += 1
                    else:
                        break
                
                explanation_text = ""
                for opt in options:
                    if opt['letter'] == correct_letter and opt['explanation']:
                        explanation_text = opt['explanation']
                
                html_out.append(f'<div class="mcq-card">')
                html_out.append(f'  <div class="mcq-question"><strong>Q{q_num}.</strong> {q_text}</div>')
                html_out.append(f'  <div class="mcq-options" data-correct="{correct_letter or ""}">')
                for opt in options:
                    html_out.append(f'    <div class="mcq-option" data-option="{opt["letter"]}">')
                    html_out.append(f'      <span class="option-letter">{opt["letter"]})</span>')
                    html_out.append(f'      <span class="option-text">{opt["text"]}</span>')
                    html_out.append(f'    </div>')
                html_out.append(f'  </div>')
                if explanation_text:
                    formatted_explanation = inline_formatting(explanation_text)
                    html_out.append(f'  <div class="mcq-explanation" style="display: none;">')
                    html_out.append(f'    <strong>Explanation:</strong> {formatted_explanation}')
                    html_out.append(f'  </div>')
                html_out.append(f'</div>')
                continue
            
        # 6. Unordered / Ordered Lists
        is_list = any(stripped.startswith(p) for p in ('- ', '* ', '+ ')) or bool(re.match(r'^\d+\.\s', stripped))
        if is_list:
            list_items = []
            list_type = 'ol' if re.match(r'^\d+\.\s', stripped) else 'ul'
            
            while i < n:
                curr_stripped = lines[i].strip()
                if any(curr_stripped.startswith(p) for p in ('- ', '* ', '+ ')):
                    content = curr_stripped[2:].strip()
                    list_items.append(content)
                    i += 1
                elif re.match(r'^\d+\.\s', curr_stripped):
                    content = re.sub(r'^\d+\.\s', '', curr_stripped).strip()
                    list_items.append(content)
                    i += 1
                elif curr_stripped == '':
                    # Peek ahead to see if list continues
                    if i + 1 < n:
                        next_stripped = lines[i+1].strip()
                        if any(next_stripped.startswith(p) for p in ('- ', '* ', '+ ')) or re.match(r'^\d+\.\s', next_stripped):
                            i += 1 # skip empty line, list continues
                            continue
                    break
                else:
                    break
                    
            html_out.append(f'<{list_type}>')
            for item in list_items:
                html_out.append(f'<li>{inline_formatting(item)}</li>')
            html_out.append(f'</{list_type}>')
            continue
            
        # 7. Paragraph
        if stripped:
            html_out.append(f'<p>{inline_formatting(stripped)}</p>')
            
        i += 1
        
    return '\n'.join(html_out)

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(os.path.dirname(script_dir))
    
    # --- Parse IoT Notes ---
    notes_path = os.path.join(project_root, 'IOT', 'ES_IOT_Complete_Notes.md')
    print(f"Reading IoT notes from {notes_path}...")
    with open(notes_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    sections_iot = {
        'st1': [],
        'st2': [],
        'endTerm': [],
        'cheatSheet': []
    }
    
    current_section = None
    current_topic = None
    topic_lines = []
    
    for line in lines:
        stripped = line.strip()
        
        # Check section boundaries
        if 'ST-1 EXAM CONTENT' in line:
            current_section = 'st1'
            continue
        elif 'ST-2 EXAM CONTENT' in line:
            if current_topic and topic_lines:
                sections_iot[current_section].append({
                    'title': current_topic,
                    'html': parse_markdown_to_html(topic_lines)
                })
                topic_lines = []
                current_topic = None
            current_section = 'st2'
            continue
        elif 'END TERM EXAM CONTENT' in line:
            if current_topic and topic_lines:
                sections_iot[current_section].append({
                    'title': current_topic,
                    'html': parse_markdown_to_html(topic_lines)
                })
                topic_lines = []
                current_topic = None
            current_section = 'endTerm'
            continue
        elif 'QUICK REFERENCE / CHEAT SHEET' in line:
            if current_topic and topic_lines:
                sections_iot[current_section].append({
                    'title': current_topic,
                    'html': parse_markdown_to_html(topic_lines)
                })
                topic_lines = []
                current_topic = None
            current_section = 'cheatSheet'
            continue
            
        # Check topic boundaries
        if stripped.startswith('## '):
            if current_topic and topic_lines:
                sections_iot[current_section].append({
                    'title': current_topic,
                    'html': parse_markdown_to_html(topic_lines)
                })
            current_topic = stripped[3:].strip()
            topic_lines = []
        else:
            if current_section and current_topic:
                topic_lines.append(line)
                
    # Save the final topic
    if current_topic and topic_lines:
        sections_iot[current_section].append({
            'title': current_topic,
            'html': parse_markdown_to_html(topic_lines)
        })
        
    print(f"Parsed IoT: ST-1 ({len(sections_iot['st1'])} topics), ST-2 ({len(sections_iot['st2'])} topics), End Term ({len(sections_iot['endTerm'])} topics), Cheat Sheet ({len(sections_iot['cheatSheet'])} topics)")
    
    # --- Parse CN Notes ---
    cn_notes_path = os.path.join(project_root, 'Computer Networks', 'cn_notes.md')
    sections_cn = {
        'unit1_2': [],
        'unit3_4': [],
        'unit5_6': [],
        'unit7_8': [],
        'unit9': []
    }
    
    if os.path.exists(cn_notes_path):
        print(f"Reading CN notes from {cn_notes_path}...")
        with open(cn_notes_path, 'r', encoding='utf-8') as f:
            cn_lines = f.readlines()
            
        current_section = None
        current_topic = None
        topic_lines = []
        
        for line in cn_lines:
            stripped = line.strip()
            
            # Check section boundaries
            if 'CN UNITS 1-2' in line:
                if current_topic and topic_lines:
                    sections_cn[current_section].append({
                        'title': current_topic,
                        'html': parse_markdown_to_html(topic_lines)
                    })
                    topic_lines = []
                    current_topic = None
                current_section = 'unit1_2'
                continue
            elif 'CN UNITS 3-4' in line:
                if current_topic and topic_lines:
                    sections_cn[current_section].append({
                        'title': current_topic,
                        'html': parse_markdown_to_html(topic_lines)
                    })
                    topic_lines = []
                    current_topic = None
                current_section = 'unit3_4'
                continue
            elif 'CN UNITS 5-6' in line:
                if current_topic and topic_lines:
                    sections_cn[current_section].append({
                        'title': current_topic,
                        'html': parse_markdown_to_html(topic_lines)
                    })
                    topic_lines = []
                    current_topic = None
                current_section = 'unit5_6'
                continue
            elif 'CN UNITS 7-8' in line:
                if current_topic and topic_lines:
                    sections_cn[current_section].append({
                        'title': current_topic,
                        'html': parse_markdown_to_html(topic_lines)
                    })
                    topic_lines = []
                    current_topic = None
                current_section = 'unit7_8'
                continue
            elif 'CN UNIT 9 & SUMMARY' in line:
                if current_topic and topic_lines:
                    sections_cn[current_section].append({
                        'title': current_topic,
                        'html': parse_markdown_to_html(topic_lines)
                    })
                    topic_lines = []
                    current_topic = None
                current_section = 'unit9'
                continue
                
            # Check topic boundaries
            if stripped.startswith('## '):
                if current_topic and topic_lines:
                    sections_cn[current_section].append({
                        'title': current_topic,
                        'html': parse_markdown_to_html(topic_lines)
                    })
                current_topic = stripped[3:].strip()
                topic_lines = []
            else:
                if current_section and current_topic:
                    topic_lines.append(line)
                    
        # Save the final topic
        if current_topic and topic_lines:
            sections_cn[current_section].append({
                'title': current_topic,
                'html': parse_markdown_to_html(topic_lines)
            })
            
        print(f"Parsed CN: Units 1-2 ({len(sections_cn['unit1_2'])} topics), Units 3-4 ({len(sections_cn['unit3_4'])} topics), Units 5-6 ({len(sections_cn['unit5_6'])} topics), Units 7-8 ({len(sections_cn['unit7_8'])} topics), Unit 9 ({len(sections_cn['unit9'])} topics)")
    else:
        print(f"Warning: CN notes not found at {cn_notes_path}. Using empty CN data.")

    # Load Practice MCQs
    iot_mcqs_path = os.path.join(project_root, 'IOT', 'iot_mcqs.json')
    if os.path.exists(iot_mcqs_path):
        print(f"Loading IoT practice MCQs from {iot_mcqs_path}...")
        with open(iot_mcqs_path, 'r', encoding='utf-8') as f_mcq:
            iot_mcq_bank = json.load(f_mcq)
    else:
        iot_mcq_bank = []

    cn_mcqs_path = os.path.join(project_root, 'Computer Networks', 'cn_mcqs.json')
    if os.path.exists(cn_mcqs_path):
        print(f"Loading CN practice MCQs from {cn_mcqs_path}...")
        with open(cn_mcqs_path, 'r', encoding='utf-8') as f_mcq:
            cn_mcq_bank = json.load(f_mcq)
    else:
        cn_mcq_bank = []

    # --- Write to data.js ---
    data_path = os.path.join(project_root, 'IOT', 'data.js')
    with open(data_path, 'w', encoding='utf-8') as f:
        f.write("const STUDY_DATA = ")
        json.dump(sections_iot, f, indent=2, ensure_ascii=False)
        f.write(";\n\n")
        f.write("const CN_STUDY_DATA = ")
        json.dump(sections_cn, f, indent=2, ensure_ascii=False)
        f.write(";\n\n")
        f.write("const IOT_MCQ_BANK = ")
        json.dump(iot_mcq_bank, f, indent=2, ensure_ascii=False)
        f.write(";\n\n")
        f.write("const CN_MCQ_BANK = ")
        json.dump(cn_mcq_bank, f, indent=2, ensure_ascii=False)
        f.write(";\n")
        
    print(f"Successfully wrote data.js to {data_path}!")

if __name__ == '__main__':
    main()
