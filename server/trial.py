from flask import Flask, jsonify

# Initialize Flask app
app = Flask(__name__)

# Define a route to return a string
@app.route('/red2', methods=['GET'])
def get_string():
    # The string you want to return
    response_string = "This is the string from Flask API"
    return jsonify({'message': response_string})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5161)
