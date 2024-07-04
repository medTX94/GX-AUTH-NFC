import jwt
import datetime
import psycopg2

SECRET_KEY = 'your_secret_key'

def create_token(user):
    payload = {
        'user': user,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=365)  # Token expires in 1 hour
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def insert_user(username, token):
    connection = psycopg2.connect(
        dbname='mydatabase',
        user='user',
        password='password',
        host='localhost'
    )
    cursor = connection.cursor()
    cursor.execute("INSERT INTO users (username, token) VALUES (%s, %s)", (username, token))
    connection.commit()
    cursor.close()
    connection.close()

if __name__ == '__main__':
    user = 'user1'
    token = create_token(user)
    insert_user(user, token)
    print(f"Token for {user}: {token}")
