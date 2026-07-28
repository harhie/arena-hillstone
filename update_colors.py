import re

with open('style.css', 'r') as f:
    content = f.read()

# Replace root variables completely
root_new = """:root {
  /* 컬러 시스템 - Hillstone Arena 테마 (라이트, 버건디) */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #f1f3f5;
  --bg-card: #ffffff;
  --bg-card-hover: #fcfcfc;
  --bg-elevated: #ffffff;

  --text-primary: #111827;
  --text-secondary: #4b5563;
  --text-tertiary: #6b7280;
  --text-muted: #9ca3af;

  /* 버건디(Burgundy) 톤 */
  --accent-start: #8e1828;
  --accent-mid: #7b1126;
  --accent-end: #5a0c1c;
  --accent-glow: rgba(123, 17, 38, 0.08);
  --accent-glow-strong: rgba(123, 17, 38, 0.2);

  --border-subtle: rgba(0, 0, 0, 0.08);
  --border-light: rgba(0, 0, 0, 0.12);
  --border-accent: rgba(123, 17, 38, 0.3);

  --gold: #d97706;
  --green: #059669;
  --red: #dc2626;

  /* 타이포그래피 */
  --font-sans: 'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* 간격 */
  --section-y: clamp(80px, 12vw, 160px);
  --container-x: clamp(20px, 5vw, 80px);
  --container-max: 1200px;

  /* 곡률 */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* 그림자 */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 48px rgba(0,0,0,0.12);
  --shadow-glow: 0 0 40px var(--accent-glow);

  /* 전환 */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}"""

content = re.sub(r':root \{.*?\n\}', root_new, content, flags=re.DOTALL)

# Hardcoded rgba replacements
content = content.replace('rgba(99, 102, 241,', 'rgba(123, 17, 38,')
content = content.replace('rgba(99,102,241,', 'rgba(123,17,38,')
content = content.replace('rgba(139, 92, 246,', 'rgba(142, 24, 40,')
content = content.replace('rgba(139,92,246,', 'rgba(142,24,40,')
content = content.replace('rgba(8, 9, 13, 0.85)', 'rgba(255, 255, 255, 0.85)')
content = content.replace('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.03)')
content = content.replace('rgba(255,255,255,0.03)', 'rgba(0,0,0,0.05)')

with open('style.css', 'w') as f:
    f.write(content)
