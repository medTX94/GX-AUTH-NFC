# GX-AUTH-NFC
This project aims to develop an end-to-end NFC-based authentication system. Users will authenticate themselves on a web application by scanning an NFC card with their Android device. The card contains a JWT (JSON Web Token) which is verified by the web server to grant or deny access.

Components

    Web Server: Hosted in a Docker container, handling HTTP requests and JWT verification.
    Database: Stores user information and authentication tokens.
    API: Facilitates communication between the Android app and the web server for authentication.
    Android App: Reads NFC cards and sends the JWT to the web server for authentication.

Technologies Used

    Backend: Flask (Python) or Express (Node.js)
    Database: PostgreSQL or MySQL
    Docker: For containerizing the web server and database
    Android: Android Studio for app development
    JWT: JSON Web Token for secure token-based authentication
