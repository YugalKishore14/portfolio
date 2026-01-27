
import os
import google.generativeai as genai

GEMINI_API_KEY = "AIzaSyCy0NSLjVw8qY3S5aKMoFIqq5f8lQ8IWA0"
genai.configure(api_key=GEMINI_API_KEY)

try:
    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content("Hello, this is a test.")
    print("Success!")
    print(response.text)
except Exception as e:
    print("Error occurred:")
    print(e)
