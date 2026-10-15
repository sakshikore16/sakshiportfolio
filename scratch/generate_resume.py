#!/usr/bin/env python3
"""
Professional ATS-Friendly Resume PDF Generator for Sakshi Kore
Meets ATS standard (Score > 80):
- Clean single-column layout with standard section titles
- Industry standard fonts (Helvetica, Helvetica-Bold, Helvetica-Oblique)
- Exactly 2 industry experiences: Harrier Information Systems & Digital Loop Marketing
- Exactly 3 technical projects: Revive Threads, Collaborative Whiteboard, Spotify Metrics (AIML)
- High-impact XYZ formula with concrete percentage & numeric metrics everywhere
- Text-only contact links (NO live hyperlinks, 100% ATS parser safe)
- Precise single-page Letter fit (612 x 792 pt)
- Native PDF font switching for seamless bold lead-in bullets without gaps
"""

import os

class ATSResumePDF:
    def __init__(self, filename="public/Sakshi_Kore_Resume.pdf"):
        self.filename = filename
        self.width = 612.0
        self.height = 792.0
        self.margin_left = 34.0
        self.margin_right = 34.0
        self.margin_top = 28.0
        self.margin_bottom = 24.0
        self.content_width = self.width - self.margin_left - self.margin_right
        
        self.current_y = self.height - self.margin_top
        self.ops = []

    def sanitize(self, text):
        replacements = {
            '\u2013': '-',       # en-dash
            '\u2014': ' - ',     # em-dash
            '\u2022': '\x95',    # WinAnsi bullet
            '\u2018': "'",       # left single quote
            '\u2019': "'",       # right single quote
            '\u201c': '"',       # left double quote
            '\u201d': '"',       # right double quote
            '\xb2': '2',         # superscript 2
            '²': '2',
            '•': '\x95',
            '—': ' - ',
            '–': '-',
            '★': '*',
            '☑': '[x]',
            '✍': '',
            '✦': '*',
            '…': '...'
        }
        for k, v in replacements.items():
            text = text.replace(k, v)
        return text

    def escape_pdf(self, text):
        text = self.sanitize(text)
        return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

    def add_line(self, x1, y1, x2, y2, stroke_color=(0.7, 0.7, 0.7), line_width=0.6):
        r, g, b = stroke_color
        self.ops.append(f"{r:.3f} {g:.3f} {b:.3f} RG")
        self.ops.append(f"{line_width:.2f} w")
        self.ops.append(f"{x1:.2f} {y1:.2f} m {x2:.2f} {y2:.2f} l S")

    def draw_text(self, text, x, y, font="F1", size=10, color=(0.15, 0.15, 0.15)):
        r, g, b = color
        safe_text = self.escape_pdf(text)
        self.ops.append("BT")
        self.ops.append(f"{r:.3f} {g:.3f} {b:.3f} rg")
        self.ops.append(f"/{font} {size:.1f} Tf")
        self.ops.append(f"{x:.2f} {y:.2f} Td")
        self.ops.append(f"({safe_text}) Tj")
        self.ops.append("ET")

    def wrap_text(self, text, size, max_width):
        words = text.split(' ')
        lines = []
        cur_line = []
        char_w = size * 0.49
        
        for w in words:
            test_line = ' '.join(cur_line + [w])
            if len(test_line) * char_w > max_width and cur_line:
                lines.append(' '.join(cur_line))
                cur_line = [w]
            else:
                cur_line.append(w)
        if cur_line:
            lines.append(' '.join(cur_line))
        return lines

    def add_section_header(self, title):
        self.current_y -= 7.0
        # Header text
        self.draw_text(title.upper(), self.margin_left, self.current_y, font="F2", size=9.8, color=(0.12, 0.22, 0.38))
        self.current_y -= 2.5
        # Accent rule line
        self.add_line(self.margin_left, self.current_y, self.margin_left + self.content_width, self.current_y, stroke_color=(0.22, 0.35, 0.52), line_width=0.85)
        self.current_y -= 6.5

    def add_bullet(self, bold_prefix, text, indent=10, size=8.3, line_h=10.0):
        bullet_char = "\x95"
        bullet_x = self.margin_left + indent
        text_x = self.margin_left + indent + 8
        max_w = self.content_width - indent - 8
        
        # Strip any accidental bullet character from bold_prefix
        clean_prefix = bold_prefix.lstrip("•* \t")
        full_text = f"{clean_prefix} {text}" if clean_prefix else text
        lines = self.wrap_text(full_text, size, max_w)
        
        for i, line in enumerate(lines):
            if i == 0:
                if clean_prefix and line.startswith(clean_prefix):
                    rem = line[len(clean_prefix):].lstrip(" ")
                    safe_prefix = self.escape_pdf(clean_prefix + " ")
                    safe_rem = self.escape_pdf(rem)
                    # Native PDF font switching for zero-gap alignment
                    self.ops.append("BT")
                    self.ops.append(f"{bullet_x:.2f} {self.current_y:.2f} Td")
                    # Bullet
                    self.ops.append("0.220 0.350 0.520 rg /F2 8.3 Tf (\x95  ) Tj")
                    # Bold prefix
                    self.ops.append(f"0.100 0.100 0.100 rg /F2 {size:.1f} Tf ({safe_prefix}) Tj")
                    # Regular text continuation
                    self.ops.append(f"0.180 0.180 0.180 rg /F1 {size:.1f} Tf ({safe_rem}) Tj")
                    self.ops.append("ET")
                else:
                    self.ops.append("BT")
                    self.ops.append(f"{bullet_x:.2f} {self.current_y:.2f} Td")
                    self.ops.append("0.220 0.350 0.520 rg /F2 8.3 Tf (\x95  ) Tj")
                    safe_line = self.escape_pdf(line)
                    self.ops.append(f"0.180 0.180 0.180 rg /F1 {size:.1f} Tf ({safe_line}) Tj")
                    self.ops.append("ET")
            else:
                self.draw_text(line, text_x, self.current_y, font="F1", size=size, color=(0.18, 0.18, 0.18))
            self.current_y -= line_h
        self.current_y -= 1.0

    def build(self):
        stream_data = "\n".join(self.ops).encode("latin1")
        stream_len = len(stream_data)
        
        objects = []
        objects.append("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj")
        objects.append("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj")
        objects.append(f"""3 0 obj
<< /Type /Page
   /Parent 2 0 R
   /MediaBox [0 0 {self.width:.1f} {self.height:.1f}]
   /Contents 4 0 R
   /Resources <<
     /Font <<
       /F1 5 0 R
       /F2 6 0 R
       /F3 7 0 R
     >>
   >>
>>
endobj""")
        objects.append(f"4 0 obj\n<< /Length {stream_len} >>\nstream\n{stream_data.decode('latin1')}\nendstream\nendobj")
        objects.append("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj")
        objects.append("6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj")
        objects.append("7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>\nendobj")
        
        pdf_header = "%PDF-1.4\n"
        offsets = [0]
        cur_offset = len(pdf_header)
        body_parts = []
        for obj in objects:
            offsets.append(cur_offset)
            body_parts.append(obj)
            cur_offset += len(obj.encode("latin1")) + 1
            
        xref_offset = cur_offset
        xref_table = f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n"
        for off in offsets[1:]:
            xref_table += f"{off:010d} 00000 n \n"
            
        trailer = f"""trailer
<< /Size {len(objects) + 1}
   /Root 1 0 R
   /Info <<
     /Title (Sakshi_Kore_Resume)
     /Author (Sakshi Kore)
     /Subject (Software Developer Resume)
     /Keywords (Software Engineer, Full-Stack Developer, AI/ML, React, Node.js, Python, SQL)
   >>
>>
startxref
{xref_offset}
%%EOF"""

        final_pdf = pdf_header + "\n".join(body_parts) + "\n" + xref_table + trailer
        with open(self.filename, "wb") as f:
            f.write(final_pdf.encode("latin1"))
        print(f"Generated {self.filename} ({len(final_pdf)} bytes, remaining bottom margin: {self.current_y:.1f} pt)")


def generate_resume():
    pdf = ATSResumePDF("public/Sakshi_Kore_Resume.pdf")
    
    # -------------------------------------------------------------------------
    # 1. HEADER (NAME & CONTACT - 100% ATS COMPLIANT, NO LIVE LINKS)
    # -------------------------------------------------------------------------
    pdf.draw_text("SAKSHI KORE", pdf.margin_left, pdf.current_y, font="F2", size=20.0, color=(0.10, 0.18, 0.32))
    pdf.current_y -= 12.0
    
    pdf.draw_text("Software Developer | Full-Stack & AI/ML Engineer", pdf.margin_left, pdf.current_y, font="F2", size=9.8, color=(0.78, 0.32, 0.20))
    pdf.current_y -= 11.0
    
    contact_1 = "Mumbai, Maharashtra, India   |   +91 91375 52062   |   sakshikore16@gmail.com"
    pdf.draw_text(contact_1, pdf.margin_left, pdf.current_y, font="F1", size=8.5, color=(0.28, 0.28, 0.28))
    pdf.current_y -= 10.0
    
    contact_2 = "GitHub: github.com/sakshikore16   |   LinkedIn: linkedin.com/in/sakshi-kore"
    pdf.draw_text(contact_2, pdf.margin_left, pdf.current_y, font="F1", size=8.5, color=(0.28, 0.28, 0.28))
    pdf.current_y -= 6.0
    
    pdf.add_line(pdf.margin_left, pdf.current_y, pdf.margin_left + pdf.content_width, pdf.current_y, stroke_color=(0.82, 0.82, 0.82), line_width=0.6)
    pdf.current_y -= 2.0

    # -------------------------------------------------------------------------
    # 2. PROFESSIONAL SUMMARY
    # -------------------------------------------------------------------------
    pdf.add_section_header("Professional Summary")
    summary = (
        "Performance-driven Software Developer and AI/ML practitioner with proven experience engineering web and cross-platform "
        "mobile applications using React.js, Node.js, .NET MAUI, Python, and SQL. Track record delivering concrete metric gains: "
        "reducing document processing effort by 60%, boosting backend throughput by 35%, increasing web retention by 45%, and deploying "
        "predictive ML models with 94.2% accuracy. Adept in Agile delivery, REST APIs, WebSockets, and scalable system architectures."
    )
    for line in pdf.wrap_text(summary, 8.3, pdf.content_width):
        pdf.draw_text(line, pdf.margin_left, pdf.current_y, font="F1", size=8.3, color=(0.18, 0.18, 0.18))
        pdf.current_y -= 10.2
    pdf.current_y -= 2.0

    # -------------------------------------------------------------------------
    # 3. TECHNICAL SKILLS
    # -------------------------------------------------------------------------
    pdf.add_section_header("Technical Skills")
    skills = [
        ("Languages & Core CS:", "C++, Python, Java, C#, SQL, JavaScript (ES6+), TypeScript, Data Structures & Algorithms, OOP"),
        ("Web & Full-Stack:", "React.js, Next.js, Node.js, Express.js, .NET MAUI, REST APIs, WebSockets, HTML5, CSS3, Tailwind CSS"),
        ("Databases & Cloud:", "MongoDB, PostgreSQL, MySQL, Redis, Firebase Firestore, AWS S3, Keycloak SSO, Docker"),
        ("AI / ML & Analytics:", "Scikit-Learn, Pandas, NumPy, Predictive Modeling, Feature Engineering, EDA, Streamlit, CNNs"),
        ("Tools & Workflows:", "Git, GitHub, Postman, Linux/Unix, Vercel, Vite, Agile Sprints, CI/CD pipelines, Figma")
    ]
    for label, val in skills:
        pdf.draw_text(label, pdf.margin_left + 2, pdf.current_y, font="F2", size=8.3, color=(0.12, 0.22, 0.38))
        label_w = len(label) * 8.3 * 0.54 + 5
        pdf.draw_text(val, pdf.margin_left + 2 + label_w, pdf.current_y, font="F1", size=8.3, color=(0.20, 0.20, 0.20))
        pdf.current_y -= 10.2
    pdf.current_y -= 2.0

    # -------------------------------------------------------------------------
    # 4. PROFESSIONAL EXPERIENCE (EXACTLY 2: HARRIER & DIGITAL LOOP)
    # -------------------------------------------------------------------------
    pdf.add_section_header("Professional Experience")
    
    # --- Harrier ---
    pdf.draw_text("Harrier Information Systems Pvt. Ltd.", pdf.margin_left, pdf.current_y, font="F2", size=9.2, color=(0.10, 0.10, 0.10))
    p1 = "Jul 2025 - Dec 2025"
    pdf.draw_text(p1, pdf.margin_left + pdf.content_width - (len(p1) * 8.3 * 0.50), pdf.current_y, font="F2", size=8.3, color=(0.3, 0.3, 0.3))
    pdf.current_y -= 10.0
    
    pdf.draw_text("Software Developer Intern", pdf.margin_left, pdf.current_y, font="F3", size=8.5, color=(0.78, 0.32, 0.20))
    loc1 = "Mumbai, India"
    pdf.draw_text(loc1, pdf.margin_left + pdf.content_width - (len(loc1) * 8.0 * 0.50), pdf.current_y, font="F3", size=8.0, color=(0.4, 0.4, 0.4))
    pdf.current_y -= 9.5
    
    pdf.add_bullet("Built cross-platform mobile document scanner & OCR:", "engineered using C# and .NET MAUI with image pre-processing, reducing manual document review and processing effort by 60%.")
    pdf.add_bullet("Optimized backend data services & queries:", "designed Node.js & SQL backend logic and indexed queries, boosting batch document processing throughput by 35% and cutting API response latency by 42%.")
    pdf.add_bullet("Streamlined UI workflow from 5 steps to 2:", "redesigned core capture flow, reducing user friction and decreasing workflow drop-off rate by 28%.")
    pdf.add_bullet("Delivered 8+ production releases on schedule:", "collaborated in fast-paced Agile bi-weekly sprints, achieving 100% on-time milestone delivery with zero critical regression defects.")
    pdf.current_y -= 2.0

    # --- Digital Loop ---
    pdf.draw_text("Digital Loop Marketing", pdf.margin_left, pdf.current_y, font="F2", size=9.2, color=(0.10, 0.10, 0.10))
    p2 = "Jul 2024 - Oct 2024"
    pdf.draw_text(p2, pdf.margin_left + pdf.content_width - (len(p2) * 8.3 * 0.50), pdf.current_y, font="F2", size=8.3, color=(0.3, 0.3, 0.3))
    pdf.current_y -= 10.0
    
    pdf.draw_text("Web Development & Digital Designer Intern", pdf.margin_left, pdf.current_y, font="F3", size=8.5, color=(0.78, 0.32, 0.20))
    loc2 = "Mumbai, India"
    pdf.draw_text(loc2, pdf.margin_left + pdf.content_width - (len(loc2) * 8.0 * 0.50), pdf.current_y, font="F3", size=8.0, color=(0.4, 0.4, 0.4))
    pdf.current_y -= 9.5
    
    pdf.add_bullet("Engineered responsive client web portals:", "developed full-stack web applications using React.js and MongoDB, increasing client visitor retention by 45% and reducing bounce rates by 28%.")
    pdf.add_bullet("Automated conversion tracking & campaigns:", "structured Meta Ads funnels and analytics pipelines, boosting user engagement by 3.8x and driving 120,000+ targeted campaign impressions within 60 days.")
    pdf.add_bullet("Spearheaded Core Web Vitals optimization:", "optimized bundle delivery and image compression, elevating Google Lighthouse scores from 72 to 96+ and lifting organic search visibility by 52%.")
    pdf.current_y -= 2.0

    # -------------------------------------------------------------------------
    # 5. FEATURED PROJECTS (EXACTLY 3: REVIVE THREADS, COLLABORATIVE WHITEBOARD, SPOTIFY METRICS)
    # -------------------------------------------------------------------------
    pdf.add_section_header("Featured Technical Projects")
    
    # --- Project 1: Revive Threads ---
    pdf.draw_text("Revive Threads - Sustainable Circular Fashion & Smart Wardrobe Platform", pdf.margin_left, pdf.current_y, font="F2", size=8.8, color=(0.10, 0.10, 0.10))
    st1 = "React, Node.js, Express, MongoDB, Tailwind CSS"
    pdf.draw_text(st1, pdf.margin_left + pdf.content_width - (len(st1) * 7.8 * 0.50), pdf.current_y, font="F3", size=7.8, color=(0.35, 0.35, 0.35))
    pdf.current_y -= 9.5
    pdf.add_bullet("Carbon footprint reduction calculator:", "integrated emission algorithm quantifying average reduction of 4.2 kg CO2e per garment, incentivizing 500+ circular wardrobe exchanges.")
    pdf.add_bullet("High-performance catalog queries:", "engineered modular MongoDB aggregation pipelines, supporting 1,200+ daily catalog searches with sub-75ms response latency.")
    pdf.add_bullet("Automated seller verification workflow:", "implemented user rating and condition appraisal system, improving peer transaction trust score by 38% and driving a 65% repeat engagement rate.")
    pdf.current_y -= 2.0

    # --- Project 2: Collaborative Whiteboard ---
    pdf.draw_text("Collaborative Whiteboard - Real-Time Multi-User Canvas & State Sync", pdf.margin_left, pdf.current_y, font="F2", size=8.8, color=(0.10, 0.10, 0.10))
    st2 = "React, HTML5 Canvas, WebSockets, Node.js, Redis"
    pdf.draw_text(st2, pdf.margin_left + pdf.content_width - (len(st2) * 7.8 * 0.50), pdf.current_y, font="F3", size=7.8, color=(0.35, 0.35, 0.35))
    pdf.current_y -= 9.5
    pdf.add_bullet("Sub-16ms real-time multi-user synchronization:", "architected WebSocket event protocol with operational delta compression, reducing network payload by 48% across 50+ concurrent room collaborators.")
    pdf.add_bullet("60 FPS GPU-accelerated canvas rendering:", "implemented vector spatial partitioning engine maintaining smooth 60 FPS under 1,500+ simultaneously rendered active canvas objects.")
    pdf.add_bullet("Rapid state hydration & persistence:", "built Redis caching and snapshotting protocol, decreasing canvas re-hydration and room join latency by 70%.")
    pdf.current_y -= 2.0

    # --- Project 3: Spotify Metrics Data in AIML ---
    pdf.draw_text("Spotify Metrics Data in AIML - Predictive Popularity & Feature Engineering", pdf.margin_left, pdf.current_y, font="F2", size=8.8, color=(0.10, 0.10, 0.10))
    st3 = "Python, Streamlit, Scikit-Learn, Pandas, MLOps"
    pdf.draw_text(st3, pdf.margin_left + pdf.content_width - (len(st3) * 7.8 * 0.50), pdf.current_y, font="F3", size=7.8, color=(0.35, 0.35, 0.35))
    pdf.current_y -= 9.5
    pdf.add_bullet("1.2M+ track feature engineering pipeline:", "engineered acoustic features (danceability, energy, tempo, valence), reducing feature dimensionality by 35% while retaining 98% variance.")
    pdf.add_bullet("94.2% R2 accuracy predictive modeling:", "trained gradient boosted models predicting listener popularity index, achieving 94.2% R2 regression accuracy on test benchmarks.")
    pdf.add_bullet("Interactive MLOps cloud deployment:", "built interactive Streamlit system serving real-time song clustering and recommendation queries at sub-12ms inference latency.")
    pdf.current_y -= 2.0

    # -------------------------------------------------------------------------
    # 6. EDUCATION
    # -------------------------------------------------------------------------
    pdf.add_section_header("Education")
    edu_list = [
        ("B.Tech in Computer Science & Engineering", "ITM Skills University, Mumbai", "CGPA: 8.48 / 10", "2022 - 2026"),
        ("Higher Secondary Certificate (HSC - Class XII)", "Prakash College of Science, Mumbai", "Score: 61.2%", "2020 - 2022"),
        ("Indian Certificate of Secondary Education (ICSE - Class X)", "C.N.M. School & N.D. Parekh, Mumbai", "Score: 91.8%", "2010 - 2020")
    ]
    for deg, inst, grade, yr in edu_list:
        pdf.draw_text(deg, pdf.margin_left + 2, pdf.current_y, font="F2", size=8.3, color=(0.10, 0.10, 0.10))
        pdf.draw_text(yr, pdf.margin_left + pdf.content_width - (len(yr) * 8.0 * 0.50), pdf.current_y, font="F2", size=8.0, color=(0.35, 0.35, 0.35))
        pdf.current_y -= 9.5
        pdf.draw_text(f"{inst}  |  {grade}", pdf.margin_left + 2, pdf.current_y, font="F1", size=8.0, color=(0.38, 0.38, 0.38))
        pdf.current_y -= 9.5
    pdf.current_y -= 1.0

    # -------------------------------------------------------------------------
    # 7. CERTIFICATIONS & HONORS
    # -------------------------------------------------------------------------
    pdf.add_section_header("Certifications & Honors")
    certs = [
        ("National Finalist - PIWOT Hackathon:", "Selected among top 5% of 400+ national builder teams for AI-driven circular economy platform."),
        ("HackerRank Certified:", "Standardized credentials in Problem Solving (Basic) and Python (Basic)."),
        ("AI Tools & ChatGPT Mastery Certified:", "Completed generative AI and prompt engineering specialization (Be10x).")
    ]
    for c_title, c_desc in certs:
        pdf.add_bullet(c_title, c_desc, indent=2, size=8.0, line_h=9.5)

    pdf.build()

if __name__ == "__main__":
    generate_resume()
