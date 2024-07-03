from flask import Flask, request, jsonify
import jwt
import psycopg2

app = Flask(__name__)

SECRET_KEY = 'your-256-bit-secret'  # Ensure this matches the secret used to generate the JWT

def get_db_connection():
    connection = psycopg2.connect(
        dbname='mydatabase',
        user='user',
        password='password',
        host='db'  # The service name defined in docker-compose.yml
    )
    return connection

def get_user_by_token(token):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT username FROM users WHERE token = %s", (token,))
    user = cursor.fetchone()
    cursor.close()
    connection.close()
    return user

@app.route('/authenticate', methods=['POST'])
def authenticate():
    try:
        request_data = request.get_json()
        token = request_data['token']
        # Decode the token to verify it
        data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)