from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

class Shop:
    all_shops = []  # Class attribute to store all instances of shops
    
    def __init__(self, name, url):
        self.name = name
        self.url = url
        Shop.all_shops.append(self)  # Add the current instance to the list of all shops
    
    @classmethod
    def get_all_shops(cls):
        return cls.all_shops

rewe = Shop("Rewe", "https://www.prospektangebote.de/geschaefte/rewe/angebote")
lidl = Shop("Lidl", "https://www.prospektangebote.de/geschaefte/lidl/angebote")
aldi = Shop("Aldi", "https://www.prospektangebote.de/geschaefte/aldi-sued/angebote")

# Accessing all shops
all_shops = Shop.get_all_shops()

options = Options()
options.add_argument('--headless')

for shop in all_shops:
    print("Scraping", shop.name)
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(30)
    driver.get(shop.url)

    ScrollNumber = 30
    for i in range(1,ScrollNumber):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight - 2500)")
        time.sleep(2)

    print("done scraping", shop.name)

    try:
        file = open(f'{shop.name}.html', 'w', encoding="utf-8")
        file.write(driver.page_source)
        file.close()
        print("File successfully written.")
    except Exception as e:
        print("An error occurred while writing the file:", str(e))
    driver.close()

    with open(f'{shop.name}.html', 'r', encoding="utf-8") as file:
        html_content = file.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # Find all elements with the specified class name
    products = soup.find_all(class_='product__bottom')

    # Iterate over the elements and print their text
    for product in products:

        # Extract the name, price, and date using the appropriate CSS selectors
        name = product.select_one('.product__name').get_text(strip=True)
        
        price = product.select_one('.product__price-offer').get_text(strip=True) if product.select_one('.product__price-offer') else None
        if price is None:
            price = "No price found"

        # Try to select the date with "product-date" class, if not found, try "product__date"
        date_element = product.select_one('.product-date')
        if date_element is None:
            date_element = product.select_one('.product__date')
        
        # Extract the date if found, or set it to None otherwise
        date = date_element.get_text(strip=True) if date_element else None

        with open(f'{shop.name}.txt', 'a', encoding="utf-8") as file:
            file.write(f'{name}\n{price}\n{date}\n\n')