from flask import Flask, request
from flask_cors import CORS
import os
import shutil
from flask import jsonify
import whisperMD
import whisperOR

app = Flask(__name__)
#specify domain and port for every endpoint
CORS(app, resources={r"/MD": {"origins": "http://localhost:5116"}})
CORS(app, resources={r"/OR": {"origins": "http://localhost:5116"}})




@app.route('/MD', methods=['POST'])
def MD_logic():
    print("MD logic executed successfully")
    whisperMD.main2()
    return jsonify({"message": "MD logic executed successfully"}), 200



@app.route('/OR', methods=['POST'])
def OR_logic():
    print("OR logic executed successfully")
    whisperOR.main2()





if __name__ == '__main__':
    app.run(use_reloader=True, port=5161, threaded=True)