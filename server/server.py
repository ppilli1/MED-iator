from flask import Flask, request
from flask_cors import CORS
import os
import shutil
from flask import jsonify

app = Flask(__name__)
#specify domain and port for every endpoint
CORS(app, resources={r"/upload": {"origins": "http://localhost:5173"}})



@app.route('/MD_record', methods=['POST'])
def MD_logic():
    pass





if __name__ == '__main__':
    app.run(use_reloader=True, port=5173, threaded=True)