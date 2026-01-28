import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)

try:
    print("Listing models...")
    # client.models.list() returns an iterator of Model objects
    for m in client.models.list():
        # filter if needed, though new SDK might list all compatible
        print(m.name)
except Exception as e:
    print(e)
