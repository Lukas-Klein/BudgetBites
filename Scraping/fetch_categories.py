from bs4 import BeautifulSoup
import json
import os

categories = []

# src: https://de.wiktionary.org/wiki/Verzeichnis:Deutsch/Essen_und_Trinken/Lebensmittel
with open(f'html/lebensmittel_kategorien.html', 'r', encoding="utf-8") as file:
    html_content = file.read()

soup = BeautifulSoup(html_content, 'html.parser')
listelements = soup.find_all("a")

active = False
for li in listelements:
    if active and li.get_text() == "A":
        break
    if active:
        categories.append(li.get_text())
    if li.get_text() == "Ü":
        active = True

if os.path.exists('categories.json'):
    os.remove('categories.json')

with open ("categories.json", "w") as file:
    json.dump(categories, file)



