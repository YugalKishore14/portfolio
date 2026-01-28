import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)

try:
    response = client.models.generate_content(
        model='gemini-2.5-flash', 
        contents="Hello, this is a test."
    )
    print("Success!")
    print(response.text)
except Exception as e:
    print("Error occurred:")
    print(e)
