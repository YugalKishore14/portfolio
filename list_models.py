
import google.generativeai as genai

GEMINI_API_KEY = "AIzaSyCy0NSLjVw8qY3S5aKMoFIqq5f8lQ8IWA0"
genai.configure(api_key=GEMINI_API_KEY)

try:
    print("Listing models...")
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)
except Exception as e:
    print(e)
