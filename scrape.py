import os
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver import ChromeOptions

class Shop:
    all_shops = []  # Class attribute to store all instances of shops
    
    def __init__(self, name, url):
        self.name = name
        self.url = url
        Shop.all_shops.append(self)  # Add the current instance to the list of all shops
    
    @classmethod
    def get_all_shops(cls):
        return cls.all_shops

# Shop instances
aldi = Shop("Aldi", "https://www.prospektangebote.de/geschaefte/aldi-sud/angebote")
rewe = Shop("Rewe", "https://www.prospektangebote.de/geschaefte/rewe/angebote")
lidl = Shop("Lidl", "https://www.prospektangebote.de/geschaefte/lidl/angebote")

# Accessing all shops
all_shops = Shop.get_all_shops()

options = ChromeOptions()
options.add_argument("--headless=new")

for shop in all_shops:
    print(f"Scraping {shop.name}")
    
    # Initialize webdriver and navigate to URL
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(30)
    driver.get(shop.url)

    # Scroll down the page to load content
    scroll_number = 30
    for i in range(scroll_number):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight - 2500)")
        time.sleep(2)

    print(f"Done scraping {shop.name}")

    # Save page source to an HTML file
    try:
        with open(f'html/{shop.name}.html', 'w', encoding="utf-8") as file:
            file.write(driver.page_source)
        print("HTML File successfully written.")
    except Exception as e:
        print(f"An error occurred while writing the file: {e}")
    driver.close()

    # Parse HTML content and extract product information
    with open(f'html/{shop.name}.html', 'r', encoding="utf-8") as file:
        html_content = file.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    products = soup.find_all(class_='product__bottom')

    # Remove existing text file
    if os.path.exists(f'{shop.name}.txt'):
        os.remove(f'{shop.name}.txt')

    for product in products:
        # Extract the name, price, and date using the appropriate CSS selectors
        name = product.select_one('.product__name').get_text(strip=True)

        price_element = product.select_one('.product__price-offer')
        price = price_element.get_text(strip=True) if price_element else "No price found"

        date_element = product.select_one('.product-date') or product.select_one('.product__date')
        date = date_element.get_text(strip=True) if date_element else None

        # Write product information to a text file
        with open(f'txt/{shop.name}.txt', 'a', encoding="utf-8") as file:
            file.write(f'{name}\n{price}\n{date}\n\n')
