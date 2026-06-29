import zipfile
import xml.etree.ElementTree as ET
import os
import json
import subprocess

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pptx_path = os.path.join(base_dir, "src", "assets", "SENANITECH_PPT.pptx")
output_path = os.path.join(base_dir, "src", "data", "portfolio-slides.ts")

def classify_layout(slide_num, title, shapes_text):
    title_upper = title.upper()
    if slide_num == 1:
        return 'title'
    if 'ABOUT US' in title_upper:
        return 'about'
    if 'OUR SERVICES' in title_upper:
        return 'services'
    if 'TOOLS EXPERTISE' in title_upper:
        return 'tools'
    if title_upper in ['VALUABLE CLIENTS', 'THANK YOU']:
        return 'title'
        
    has_specs = False
    for shape in shapes_text:
        for text in shape:
            if any(marker in text for marker in [
                'Package Detail', 'Power Design', 'Routing Strategy', 'Critical Layering', 
                'Board Type', 'Complexity', 'Design Goals', 'Core Tech', 'Application Type', 
                'Processor Tech', 'Complexity & Layering', 'Signal Speeds', 'PCB Complexity', 
                'Hardware Class', 'Interfaces', 'PCB Design Details', 'Power Delivery', 
                'Application Area', 'Design Complexity', 'Layer Count', 'Memory Support', 
                'PCB Details', 'Card Class', 'PCB Specifications', 'Signal Tuning'
            ]):
                has_specs = True
                break
    if has_specs:
        return 'tech'
        
    return 'bullets'

def parse_pptx():
    if not os.path.exists(pptx_path):
        print(f"PPTX file not found at: {pptx_path}")
        return False
        
    slides = []
    
    with zipfile.ZipFile(pptx_path, 'r') as zip_ref:
        # Get slide files sorted
        slide_files = sorted([f for f in zip_ref.namelist() if f.startswith('ppt/slides/slide') and f.endswith('.xml')],
                             key=lambda x: int(''.join(c for c in os.path.basename(x) if c.isdigit())))
                             
        for idx, slide_file in enumerate(slide_files, 1):
            slide_xml = zip_ref.read(slide_file)
            root = ET.fromstring(slide_xml)
            
            namespaces = {
                'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
                'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
                'p': 'http://schemas.openxmlformats.org/presentationml/2006/main'
            }
            
            # Find shapes text
            shapes_text = []
            for shape in root.findall('.//p:sp', namespaces):
                shape_text_runs = []
                for paragraph in shape.findall('.//a:p', namespaces):
                    para_text = "".join([t.text for t in paragraph.findall('.//a:t', namespaces) if t.text])
                    if para_text.strip():
                        shape_text_runs.append(para_text.strip())
                if shape_text_runs:
                    shapes_text.append(shape_text_runs)
            
            # Process title & contents
            title = ""
            intro = ""
            bullets = []
            grid_items = []
            columns = []
            
            # Identify title
            if len(shapes_text) > 0:
                title = " ".join(shapes_text[0]).strip()
            
            layout = classify_layout(idx, title, shapes_text)
            
            if layout == 'title':
                subtitle = ""
                if len(shapes_text) > 1:
                    subtitle = " ".join(shapes_text[1]).strip()
                slides.append({
                    "id": idx,
                    "title": title or "SENANITECH",
                    "subtitle": subtitle,
                    "layout": "title"
                })
            elif layout == 'about':
                intro = ""
                if len(shapes_text) > 1:
                    intro = " ".join(shapes_text[1]).strip()
                focus_areas = []
                for shape in shapes_text[2:]:
                    focus_areas.extend(shape)
                
                focus_areas = [f for f in focus_areas if f.upper() != "FOCUS AREAS"]
                
                grid_items = [{"num": f"0{i+1}", "label": label} for i, label in enumerate(focus_areas)]
                slides.append({
                    "id": idx,
                    "title": title,
                    "intro": intro,
                    "layout": "about",
                    "gridItems": grid_items
                })
            elif layout == 'services':
                cols = []
                current_col = None
                
                for shape in shapes_text[1:]:
                    shape_str = " ".join(shape).strip()
                    if len(shape) == 1 and (shape_str.isupper() or len(shape_str) > 20):
                        current_col = {"title": shape_str, "items": []}
                        cols.append(current_col)
                    elif current_col:
                        current_col["items"].extend(shape)
                    else:
                        current_col = {"title": "SERVICE AREA", "items": list(shape)}
                        cols.append(current_col)
                
                for c in cols:
                    c["items"] = [item for item in c["items"] if item.strip() and not item.startswith("OUR SERVICES")]
                    
                slides.append({
                    "id": idx,
                    "title": title,
                    "layout": "services",
                    "columns": cols
                })
            elif layout == 'tools':
                cols = []
                for shape in shapes_text[1:]:
                    if len(shape) >= 2:
                        cols.append({
                            "title": shape[0],
                            "items": shape[1:]
                        })
                slides.append({
                    "id": idx,
                    "title": title,
                    "layout": "tools",
                    "columns": cols
                })
            elif layout == 'tech':
                cols = []
                all_lines = []
                for shape in shapes_text[1:]:
                    all_lines.extend(shape)
                
                for line in all_lines:
                    if ":" in line:
                        parts = line.split(":", 1)
                        key = parts[0].strip()
                        val = parts[1].strip()
                        sub_items = [v.strip() for v in val.split("|") if v.strip()]
                        cols.append({
                            "title": key,
                            "items": sub_items
                        })
                    elif line.strip() and not line.startswith("WWW."):
                        if cols:
                            cols[-1]["items"].append(line)
                        else:
                            cols.append({
                                "title": "Specs",
                                "items": [line]
                            })
                            
                cols = [c for c in cols if c["title"].upper() != "WWW. SENANITECH . COM"]
                
                slides.append({
                    "id": idx,
                    "title": title,
                    "layout": "tech",
                    "columns": cols
                })
            else:
                intro_lines = []
                bullet_lines = []
                
                for shape in shapes_text[1:]:
                    shape_filtered = [line for line in shape if not line.startswith("WWW.")]
                    if len(shape_filtered) == 1 and len(shape_filtered[0]) > 60:
                        intro_lines.append(shape_filtered[0])
                    else:
                        bullet_lines.extend(shape_filtered)
                
                slides.append({
                    "id": idx,
                    "title": title,
                    "intro": " ".join(intro_lines) if intro_lines else None,
                    "bullets": bullet_lines,
                    "layout": "bullets"
                })
                
    # Write as TS file using replace instead of f-string to avoid braces issues
    ts_template = """// WARNING: This file is dynamically generated by scripts/parse-pptx.py.
// Do not edit this file directly, as it will be overwritten during compile/dev builds.

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  layout: 'title' | 'about' | 'services' | 'grid' | 'tools' | 'tech' | 'bullets';
  intro?: string;
  bullets?: string[];
  gridItems?: { num: string; label: string }[];
  columns?: { title: string; items: string[] }[];
}

export const portfolioSlides: SlideData[] = __SLIDES_PLACEHOLDER__;
"""
    ts_content = ts_template.replace("__SLIDES_PLACEHOLDER__", json.dumps(slides, indent=2, ensure_ascii=False))
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
        
    print(f"Dynamically parsed and updated {len(slides)} slides in {output_path}!")
    return True

def export_slides_via_powershell():
    slides_folder = os.path.join(base_dir, "public", "slides")
    print("Exporting PPTX slides as PNG images...")
    
    # PowerShell command to run COM PowerPoint export
    ps_command = f"""$pptxPath = '{pptx_path}';
$outputFolder = '{slides_folder}';
if (!(Test-Path $outputFolder)) {{ New-Item -ItemType Directory -Path $outputFolder }};
try {{
    $ppt = New-Object -ComObject PowerPoint.Application;
    $presentation = $ppt.Presentations.Open($pptxPath, $true, $true, $false);
    $presentation.Export($outputFolder, 'PNG');
    $presentation.Close();
    $ppt.Quit();
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppt) | Out-Null;
    Write-Output 'Successfully exported slides!';
}} catch {{
    Write-Warning $_.Exception.Message;
}}"""
    
    try:
        subprocess.run(["powershell", "-Command", ps_command], capture_output=True, text=True, check=False)
    except Exception as e:
        print(f"Failed to auto-export slides: {e}")

if __name__ == "__main__":
    export_slides_via_powershell()
    parse_pptx()
