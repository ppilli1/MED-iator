from flask import Flask, request
from flask_cors import CORS
import os
import shutil
from flask import jsonify
import whisperMD
import whisperOR
import tyy
from langchain.schema import HumanMessage, AIMessage
from langchain.prompts.chat import ChatPromptTemplate
from langchain_community.chat_models import ChatOpenAI
app = Flask(__name__)
#specify domain and port for every endpoint
CORS(app, resources={r"/MD": {"origins": "http://localhost:5116"}})
CORS(app, resources={r"/OR": {"origins": "http://localhost:5116"}})
api_key = os.getenv("OPENAI_API_KEY")
messages_red = []


@app.route('/MD', methods=['POST'])
def MD_logic():
    print("MD logic executed successfully")
    whisperMD.main2()
    return jsonify({"message": "MD logic executed successfully"}), 200



@app.route('/OR', methods=['POST'])
def OR_logic():
    print("OR logic executed successfully")
    whisperOR.main2()

@app.route('/red1', methods=['POST'])
def spline_logic():
    with open("../assets/OR_full.txt", 'r') as file:
        file_contents = file.read()
        print("file read")
    messages_red.append(HumanMessage(content = "This is what happened during surgery for a patient (given a transcript): " + file_contents + "I want you to analyze this and split the surgery into 4 summary parts. Only respond to this with the summary of the first one fourth of the surgery."))
    chat_model = ChatOpenAI(openai_api_key = api_key)
    result = chat_model.predict_messages(messages_red)

    write_content = result.content
    tyy.ty(write_content)
    print(write_content)
    
@app.route('/red2', methods=['GET'])
def ty111():
    tyy.ty()

if __name__ == '__main__':
    app.run(use_reloader=True, port=5161, threaded=True)