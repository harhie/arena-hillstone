import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Update Hillstone nav logo
old_nav_logo = """      <a href="#" class="nav-logo">
        <span class="logo-mark">H</span>
        <span class="logo-text">Hillstone</span>
      </a>"""
new_nav_logo = """      <a href="#" class="nav-logo">
        <img src="https://raw.githubusercontent.com/harhie/siteimage/main/images/1778810986132_logo_hillstone_sw.webp" alt="Hillstone Logo" height="32" />
      </a>"""
content = content.replace(old_nav_logo, new_nav_logo)

# 2. Update Hillstone footer logo
old_footer_logo = """          <div class="footer-logo">
            <span class="logo-mark">H</span>
            <span class="logo-text">Hillstone</span>
          </div>"""
new_footer_logo = """          <div class="footer-logo">
            <img src="https://raw.githubusercontent.com/harhie/siteimage/main/images/1778810986132_logo_hillstone_sw.webp" alt="Hillstone Logo" height="40" />
          </div>"""
content = content.replace(old_footer_logo, new_footer_logo)

# 3. Update CTA texts
content = content.replace(">무료 컨설팅 시작<", ">컨설팅 요청<")
content = content.replace(">무료 컨설팅 시작하기<", ">컨설팅 요청하기<")
# also hero button
content = content.replace(">컨설팅 시작하기<", ">컨설팅 요청하기<")

# 4. Update MBB logos
content = content.replace("""<div class="mbb-logo-area">
              <span class="mbb-initial">M</span>
            </div>""", """<div class="mbb-logo-image">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/McKinsey_%26_Company.svg" alt="McKinsey" height="28" />
            </div>""")

content = content.replace("""<div class="mbb-logo-area mbb-logo-bcg">
              <span class="mbb-initial">B</span>
            </div>""", """<div class="mbb-logo-image">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/Boston_Consulting_Group_2018.svg" alt="BCG" height="28" />
            </div>""")

content = content.replace("""<div class="mbb-logo-area mbb-logo-bain">
              <span class="mbb-initial">B</span>
            </div>""", """<div class="mbb-logo-image">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Bain_%26_Company_logo.svg" alt="Bain" height="28" />
            </div>""")

with open('index.html', 'w') as f:
    f.write(content)

