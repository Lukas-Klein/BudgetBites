import json
import os
import time
import difflib
from fuzzywuzzy import fuzz
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver import ChromeOptions
from datetime import datetime, timedelta

def find_best_match(name, categories):
    best_match = ""
    best_rating = 0
    for word in name.split(" "):
        best_category = ""
        best_category_similarity = 0
        for category in categories:
            if fuzz.ratio(word, category) > best_category_similarity:
                best_category = category
                best_category_similarity = fuzz.ratio(word, category)
        if fuzz.ratio(word, best_category) > best_rating:
            best_rating = fuzz.ratio(word, best_category)
            best_match = best_category
    pairs = []
    for x, word in enumerate(name.split(" ")):
        if x+1 < len(name.split(" ")):
            pairs.append(word + (name.split(" "))[x+1])
    for word in pairs:
        best_category = ""
        best_category_similarity = 0
        for category in categories:
            if fuzz.ratio(word, category) > best_category_similarity:
                best_category = category
                best_category_similarity = fuzz.ratio(word, category)
        if fuzz.ratio(word, best_category) > best_rating:
            best_rating = fuzz.ratio(word, best_category)
            best_match = best_category
            print("DOPPELT BESSER")

    if best_match == "":
        print("!!", name)
    else:
        print(name, " ->", best_match, "|", best_rating)


class Shop:
    all_shops = []  # Class attribute to store all instances of shops
    
    def __init__(self, name, url):
        self.name = name
        self.url = url
        Shop.all_shops.append(self)  # Add the current instance to the list of all shops
    
    @classmethod
    def get_all_shops(cls):
        return cls.all_shops

class Product:
    def __init__(self, name, price, date, shop):
        self.name = name
        self.price = price
        self.date = date
        self.shop = shop

def initializeDriver():
    options = ChromeOptions()
    options.add_argument("--headless=new")
    driver = webdriver.Chrome(options=options)
    return driver

def scrapeShop(shop):
    driver = initializeDriver()
    driver.get(shop.url)

    print(f"Scraping {shop.name}")

    # Scroll down the page to load content
    scroll_number = 5
    for i in range(scroll_number):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight - 2500)")
        time.sleep(2)

    # Save page source to an HTML file
    try:
        with open(f'html/{shop.name}.html', 'w', encoding="utf-8") as file:
            file.write(driver.page_source)
        print(f"Done scraping {shop.name}")
        print(f"HTML File {shop.name}.html successfully written.")
    except Exception as e:
        print(f"An error occurred while writing the file: {e}")
    driver.close()

# Shop instances
rewe = Shop("Rewe", "https://www.prospektangebote.de/geschaefte/rewe/angebote")
#aldi = Shop("Aldi", "https://www.prospektangebote.de/geschaefte/aldi-sud/angebote")
#lidl = Shop("Lidl", "https://www.prospektangebote.de/geschaefte/lidl/angebote")
#edeke = Shop("Edeka", "https://www.prospektangebote.de/geschaefte/edeka/angebote")
#kaufland = Shop("Kaufland", "https://www.prospektangebote.de/geschaefte/kaufland/angebote")

# Accessing all shops
all_shops = Shop.get_all_shops()

with open("categories.json", "r") as file:
    categories = json.load(file)

product_list = []

for shop in all_shops:
    
    #scrapeShop(shop)

    # Parse HTML content and extract product information
    with open(f'html/{shop.name}.html', 'r', encoding="utf-8") as file:
        html_content = file.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    products = soup.find_all(class_='product__bottom')

    # Remove existing text file
    if os.path.exists('offers.json'):
        os.remove('offers.json')

    for product in products:
        # Extract the name, price, and date using the appropriate CSS selectors
        name = product.select_one('.product__name').get_text(strip=True)
        find_best_match(name, categories)    

        price_element = product.select_one('.product__price-offer')
        price = price_element.get_text(strip=True) if price_element else None
        if price:
            eur = int(float(price.split("€")[1].split(",")[0]))
            cent = int(price.split(",")[1])
            price = eur + (cent / 100.0)

        date_element = product.select_one('.product-date') or product.select_one('.product__date')
        date = date_element.get_text(strip=True) if date_element else None
        if date:
            date = int(''.join(char for char in date if char.isdigit())) #filtering number
            date = datetime.now() + timedelta(days=date) # calculating date
            date = date.strftime("%Y-%m-%d") # formatting date

        specialOffer = Product(name, price, date, shop.name)

        product_list.append(specialOffer.__dict__)
    
    # Write product information to a text file
    with open('offers.json', 'a', encoding="utf-8") as file:
        json.dump(product_list, file, ensure_ascii=False, indent=2)