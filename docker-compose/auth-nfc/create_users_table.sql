CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    token VARCHAR(255) NOT NULL
);server {
    listen 80;
    server_name nfc.bouchlaghem.com;

    location / {
        proxy_pass http://web_server:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization';
    }

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
        default_type "text/plain";
    }
}

server {
    listen 443 ssl;
    server_name nfc.bouchlaghem.com;

    ssl_certificate /etc/letsencrypt/live/nfc.bouchlaghem.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/nfc.bouchlaghem.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://web_server:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization';
    }

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
        default_type "text/plain";
    }
}
