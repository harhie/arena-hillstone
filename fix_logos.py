import re

# Update index.html
with open('index.html', 'r') as f:
    html = f.read()

# Remove the h3 titles since the SVG logos already have the text
html = re.sub(r'<h3 class="mbb-name">McKinsey & Company</h3>', '', html)
html = re.sub(r'<h3 class="mbb-name">Boston Consulting Group</h3>', '', html)
html = re.sub(r'<h3 class="mbb-name">Bain & Company</h3>', '', html)

with open('index.html', 'w') as f:
    f.write(html)

# Update style.css
with open('style.css', 'r') as f:
    css = f.read()

# Change mbb-card-header
old_header = """.mbb-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-subtle);
}"""

new_header = """.mbb-card-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-subtle);
}"""
css = css.replace(old_header, new_header)

# Change mbb-logo-image
old_logo = """.mbb-logo-image {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 44px;
  width: 120px;
  flex-shrink: 0;
}

.mbb-logo-image img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}"""

new_logo = """.mbb-logo-image {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 52px;
  width: 100%;
}

.mbb-logo-image img {
  max-height: 100%;
  max-width: 200px;
  object-fit: contain;
}"""
css = css.replace(old_logo, new_logo)

with open('style.css', 'w') as f:
    f.write(css)

