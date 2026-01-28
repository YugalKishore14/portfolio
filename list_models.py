
from google import genai

GEMINI_API_KEY = "AIzaSyCy0NSLjVw8qY3S5aKMoFIqq5f8lQ8IWA0"
client = genai.Client(api_key=GEMINI_API_KEY)

try:
    print("Listing models...")
    # client.models.list() returns an iterator of Model objects
    for m in client.models.list():
        # filter if needed, though new SDK might list all compatible
        print(m.name)
except Exception as e:
    print(e)
