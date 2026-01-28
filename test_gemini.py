
import os
from google import genai

GEMINI_API_KEY = "AIzaSyCy0NSLjVw8qY3S5aKMoFIqq5f8lQ8IWA0"
client = genai.Client(api_key=GEMINI_API_KEY)

try:
    response = client.models.generate_content(
        model='gemini-2.0-flash', 
        contents="Hello, this is a test."
    )
    print("Success!")
    print(response.text)
except Exception as e:
    print("Error occurred:")
    print(e)
