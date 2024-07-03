from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import jwt
import psycopg2
import datetime
import os

app = Flask(__name__)
CORS(app)

SECRET_KEY = 'your-256-bit-secret'  # Ensure this matches the secret used to generate the JWT

def get_db_connection():
    connection = psycopg2.connect(
        dbname='mydatabase',
        user='user',
        password='password',
        host='db'  # The service name defined in docker-compose.yml
    )
    return connection

def get_user_by_credentials(username, password):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT username FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()
    cursor.close()
    connection.close()
    return user

def get_user_by_token(token):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT username FROM users WHERE token = %s", (token,))
    user = cursor.fetchone()
    cursor.close()
    connection.close()
    return user

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    user = get_user_by_credentials(username, password)
    if user:
        token = jwt.encode({
            'user': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, SECRET_KEY, algorithm='HS256')
        return jsonify({'success': True, 'token': token}), 200
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@app.route('/authenticate', methods=['POST'])
def authenticate():
    try:
        data = request.json
        token = data.get('token')
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user = get_user_by_token(token)
        if user:
            return jsonify({"message": "User authenticated", "user": user[0]}), 200
        else:
            return jsonify({"message": "Invalid user"}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401
    except Exception as e:
        return jsonify({"message": "Bad request", "error": str(e)}), 400

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)