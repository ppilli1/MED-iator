import requests
import json
from langchain.schema import HumanMessage, AIMessage
from langchain.prompts.chat import ChatPromptTemplate
from langchain_openai import ChatOpenAI
import os

# api_key = os.getenv("OPENAI_API_KEY")



def ty():

    
    with open("./assets/OR_full.txt", 'r') as file:
        file_contents = file.read()
        print("file read")
    url = 'https://hooks.spline.design/J44c_9tGM6w'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'AI5r3atVzdVoqq1etnEbdBXn0rMpkEDfnZL2PlyoDFo',
        'Accept': 'application/json'
    }

    data = {
        "vr": file_contents
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))

    print(response.status_code)
    print(response.text)
    
ty()