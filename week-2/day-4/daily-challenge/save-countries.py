import requests
import random
import psycopg2
from config import get_db_connection


def fetch_countries():

    url = "https://restcountries.com/v3.1/all?fields=name,capital,flag,subregion,population"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error retrieving data: {e}")
        return None


def get_country_data(country):
    try:
        name = country["name"]["common"]

        capital = country.get("capital")
        capital = (
            capital[0] if capital and isinstance(capital, list) else (capital or "NONE")
        )

        flag = country.get("flag", "NONE")

        subregion = country.get("subregion", "NONE")

        population = country.get("population", 0)

        return (name, capital, flag, subregion, population)
    except KeyError as e:
        print(f"Missing field in country data: {e}")
        return None


def save_to_db(countries):
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        insert_query = """
            INSERT INTO countries (name, capital, flag, subregion, population)
            VALUES (%s, %s, %s, %s, %s)
        """

        cursor.executemany(insert_query, countries)
        conn.commit()
        print(
            f"Successfully inserted {cursor.rowcount} countries into the database."
        )
        conn.close()
    except Exception as e:
        print(f"Database error: {e}")


def main():
    print("Fetching countries from REST Countries API")
    data = fetch_countries()

    if not data:
        print("Failed to retrieve country data.")
        return

    print(f"Retrieved {len(data)} countries.")

    
    random_countries = random.sample(data, 10)
    print("Selected 10 random countries.")

    country_list = []
    for country in random_countries:
        country_data = get_country_data(country)
        if country_data:
            country_list.append(country_data)

    save_to_db(country_list)


if __name__ == "__main__":
    main()
