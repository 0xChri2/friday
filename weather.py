import requests
import sys

def get_weather(api_key, location):
    base_url = "https://api.openweathermap.org/data/2.5/weather?"
    complete_url = base_url + "q=" + location + "&appid=" + api_key + "&units=metric"
    response = requests.get(complete_url)
    data = response.json()
    
    if data["cod"] != "404":
        main_data = data["main"]
        weather_data = data["weather"][0]
        
        temperature = main_data["temp"]
        pressure = main_data["pressure"]
        humidity = main_data["humidity"]
        weather_description = weather_data["description"]
        
        print(f"Ort: {location}")
        print(f"Temperatur (°C): {temperature}")
        print(f"Luftdruck (hPa): {pressure}")
        print(f"Luftfeuchtigkeit (%): {humidity}")
        print(f"Wetter: {weather_description.capitalize()}")
    else:
        print("Ort nicht gefunden!")


api_key = "api key"
location = sys.argv[1]
get_weather(api_key, location)
