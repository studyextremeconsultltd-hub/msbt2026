#!/usr/bin/env python3
"""Extract MSBT course and about-us content from DOCX via zipfile/XML."""
from __future__ import annotations

import json
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}

UNIVERSITY_DIR = Path(r"E:\MSBT\msbt-main\University contents")
OUT_COURSES = Path(r"E:\MSBT\msbt-main\src\data\extracted-courses.json")
OUT_ABOUT = Path(r"E:\MSBT\msbt-main\src\data\extracted-about.json")

COURSE_FILES = [
    ("MSBT_Business_Management_Courses.docx", "business"),
    ("MSBT_Health_and_Social_Care_Management_Courses.docx", "health"),
    ("Psychology.docx", "psychology"),
]

COURSE_TITLE_RE = re.compile(
    r"^Level [3-7] (?:Foundation )?(?:Extended )?(?:Diploma|Certificate) in .{5,90}$"
)

TITLE_SKIP_SUBSTRINGS = (
    "available in",
    "often denotes",
    "qualification provides",
    "qualifications represent",
    " modes:",
)

SECTION_ALIASES: dict[str, str] = {
    "overview": "overview",
    "entry requirements": "entryRequirements",
    "equivalences": "equivalences",
    "qualification structure": "qualificationStructure",
    "mandatory units": "units",
    "module structure": "units",
    "duration and delivery": "durationAndDelivery",
    "delivery methods": "deliveryMethods",
    "duration": "duration",
    "accreditation": "accreditation",
    "course delivery": "courseDelivery",
    "assessment and verification": "assessment",
    "assessment": "assessment",
    "progression": "progression",
    "progression & career": "progression",
    "who is it suitable for?": "whoIsItFor",
    "who is it for?": "whoIsItFor",
    "quality, standards & recognitions": "qualityStandards",
    "quality standards": "qualityStandards",
    "university progressions": "universityProgressions",
}

MOJIBAKE_REPLACEMENTS = {
    "\u00e2\u20ac\u201c": "\u2013",
    "\u00e2\u20ac\u201d": "\u2014",
    "\u00e2\u20ac\u2122": "\u2019",
    "\u00e2\u20ac\u0153": "\u201c",
    "\u00e2\u20ac\u009d": "\u201d",
    "\u00e2\u20ac\u00a6": "\u2026",
    "\u00c2\u00a0": " ",
    "\u00ef\u00bf\u00bd": "\u2013",
    "\ufffd": "\u2013",
}


def clean_text(text: str) -> str:
    if not text:
        return ""
    for bad, good in MOJIBAKE_REPLACEMENTS.items():
        text = text.replace(bad, good)
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def para_text(paragraph: ET.Element) -> str:
    parts: list[str] = []
    for node in paragraph.findall(".//w:t", NS):
        if node.text:
            parts.append(node.text)
        if node.tail:
            parts.append(node.tail)
    return clean_text("".join(parts))


def read_docx_paragraphs(path: Path) -> list[str]:
    with zipfile.ZipFile(path) as zf:
        root = ET.fromstring(zf.read("word/document.xml"))
    lines: list[str] = []
    for paragraph in root.findall(".//w:p", NS):
        text = para_text(paragraph)
        if text:
            lines.append(text)
    return lines


def is_course_title(line: str) -> bool:
    if not COURSE_TITLE_RE.match(line):
        return False
    lower = line.lower()
    return not any(s in lower for s in TITLE_SKIP_SUBSTRINGS)


def is_badge_line(line: str) -> bool:
    return bool(re.search(r"Ofqual|NVQ/RQF|Fast Track", line, re.I)) and "|" in line


def is_section_header(line: str) -> str | None:
    key = line.strip().rstrip(":").lower()
    return SECTION_ALIASES.get(key)


def is_noise_line(line: str) -> bool:
    if line.startswith("Course Enquiry"):
        return True
    if line in ("Course Details", "Module Structure", "Progression & Career"):
        return True
    if re.match(r"^Duration:\s*\d", line, re.I):
        return True
    return False


def looks_like_unit(line: str) -> bool:
    return bool(re.search(r"\(\d+\s*credits?\)", line, re.I))


def join_paragraphs(parts: list[str]) -> str:
    return clean_text("\n\n".join(p for p in parts if p and not is_noise_line(p)))


def parse_course_block(paragraphs: list[str], title: str, category: str, source: str) -> dict:
    sections: dict[str, list[str]] = {}
    current_key: str | None = None
    delivery_bullets: list[str] = []
    in_delivery_bullets = False
    units_list: list[str] = []

    i = 0
    while i < len(paragraphs):
        line = paragraphs[i]
        if is_noise_line(line):
            i += 1
            continue

        header = is_section_header(line)
        if header:
            in_delivery_bullets = False
            current_key = header
            if header == "units" and i + 1 < len(paragraphs):
                nxt = paragraphs[i + 1]
                if nxt.lower() == "mandatory units":
                    i += 2
                    current_key = "units"
                    continue
            i += 1
            continue

        if current_key == "deliveryMethods" and line.lower() == "learners will be able to:":
            in_delivery_bullets = True
            i += 1
            continue

        if in_delivery_bullets:
            if is_section_header(line) or line.lower().startswith("duration"):
                in_delivery_bullets = False
                header = is_section_header(line)
                if header:
                    current_key = header
                i += 1
                if not header:
                    continue
                continue
            delivery_bullets.append(line)
            i += 1
            continue

        if current_key == "units":
            if looks_like_unit(line):
                units_list.append(line)
                i += 1
                continue
            next_header = is_section_header(line)
            if next_header:
                current_key = next_header
                i += 1
                continue
            if line.lower() == "mandatory units":
                i += 1
                continue

        if current_key:
            sections.setdefault(current_key, []).append(line)
        i += 1

    duration_parts: list[str] = []
    if sections.get("durationAndDelivery"):
        duration_parts.append(join_paragraphs(sections["durationAndDelivery"]))
    if sections.get("duration"):
        duration_parts.append(join_paragraphs(sections["duration"]))
    duration_modes = clean_text("\n\n".join(p for p in duration_parts if p))

    for src in ("units", "qualificationStructure"):
        for line in sections.get(src, []):
            if looks_like_unit(line) and line not in units_list:
                units_list.append(line)

    course = {
        "title": title,
        "category": category,
        "sourceFile": source,
        "overview": join_paragraphs(sections.get("overview", [])),
        "entryRequirements": join_paragraphs(sections.get("entryRequirements", [])),
        "equivalences": join_paragraphs(sections.get("equivalences", [])),
        "units": units_list,
        "durationModes": duration_modes,
        "deliveryMethods": delivery_bullets,
        "accreditation": join_paragraphs(sections.get("accreditation", [])),
        "assessment": join_paragraphs(sections.get("assessment", [])),
        "progression": join_paragraphs(sections.get("progression", [])),
    }

    if sections.get("courseDelivery"):
        extra = join_paragraphs(sections["courseDelivery"])
        if extra:
            course["durationModes"] = clean_text(
                f"{course['durationModes']}\n\nCourse Delivery\n{extra}".strip()
            )

    for optional in ("whoIsItFor", "qualityStandards", "universityProgressions"):
        if sections.get(optional):
            course[optional] = join_paragraphs(sections[optional])

    return course


def extract_courses_from_file(path: Path, category: str) -> list[dict]:
    paragraphs = read_docx_paragraphs(path)
    starts: list[tuple[int, str]] = []
    for idx, line in enumerate(paragraphs):
        if is_course_title(line):
            starts.append((idx, line))

    courses: list[dict] = []
    for n, (start, title) in enumerate(starts):
        end = starts[n + 1][0] if n + 1 < len(starts) else len(paragraphs)
        body_start = start + 1
        if body_start < end and is_badge_line(paragraphs[body_start]):
            body_start += 1
        while body_start < end and is_noise_line(paragraphs[body_start]):
            body_start += 1
        block = paragraphs[body_start:end]
        courses.append(parse_course_block(block, title, category, path.name))
    return courses


def extract_about(path: Path) -> dict:
    paragraphs = read_docx_paragraphs(path)
    tabs: list[dict] = []
    current_tab: dict | None = None
    tab_re = re.compile(r"^TAB\s+(\d+)\s*$", re.I)

    for line in paragraphs:
        if line.lower().startswith("notes for the web developer"):
            break
        m = tab_re.match(line)
        if m:
            if current_tab:
                current_tab["content"] = clean_text(current_tab["content"])
                tabs.append(current_tab)
            current_tab = {"tab": int(m.group(1)), "title": "", "content": ""}
            continue
        if current_tab is not None:
            if not current_tab["title"] and line and not tab_re.match(line):
                current_tab["title"] = line
            else:
                if current_tab["content"]:
                    current_tab["content"] += "\n\n" + line
                else:
                    current_tab["content"] = line

    if current_tab:
        current_tab["content"] = clean_text(current_tab["content"])
        tabs.append(current_tab)

    return {"sourceFile": path.name, "tabs": tabs}


def main() -> None:
    all_courses: list[dict] = []
    for filename, category in COURSE_FILES:
        path = UNIVERSITY_DIR / filename
        if not path.is_file():
            raise FileNotFoundError(path)
        all_courses.extend(extract_courses_from_file(path, category))

    about_path = UNIVERSITY_DIR / "MSBT_About_Us_Page_v2.docx"
    about_data = extract_about(about_path)

    OUT_COURSES.parent.mkdir(parents=True, exist_ok=True)
    with OUT_COURSES.open("w", encoding="utf-8") as f:
        json.dump({"courses": all_courses}, f, ensure_ascii=False, indent=2)
        f.write("\n")

    with OUT_ABOUT.open("w", encoding="utf-8") as f:
        json.dump(about_data, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"Wrote {len(all_courses)} courses -> {OUT_COURSES}")
    for c in all_courses:
        unit_count = len(c.get("units", []))
        print(f"  - [{c['category']}] {c['title']} ({unit_count} units)")
    print(f"Wrote {len(about_data['tabs'])} about tabs -> {OUT_ABOUT}")
    for t in about_data["tabs"]:
        print(f"  - TAB {t['tab']}: {t['title']} ({len(t['content'])} chars)")


if __name__ == "__main__":
    main()

