import re

with open('index.html', 'r') as f:
    content = f.read()

replacements = {
    'https://raw.githubusercontent.com/harhie/siteimage/main/images/1778810986132_logo_hillstone_sw.webp': 'images/hillstone.webp',
    'https://upload.wikimedia.org/wikipedia/commons/e/ea/McKinsey_%26_Company.svg': 'images/mckinsey.svg',
    'https://upload.wikimedia.org/wikipedia/commons/3/30/Boston_Consulting_Group_2018.svg': 'images/bcg.svg',
    'https://upload.wikimedia.org/wikipedia/commons/6/6a/Bain_%26_Company_logo.svg': 'images/bain.svg'
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open('index.html', 'w') as f:
    f.write(content)
