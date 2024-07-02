
# NFC Authentication System

## Project Overview

This project aims to develop an end-to-end NFC-based authentication system. Users will authenticate themselves on a web application by scanning an NFC card with their Android device. The card contains a JWT (JSON Web Token) which is verified by the web server to grant or deny access.

## Components

1. **Web Server**: Hosted in a Docker container, handling HTTP requests and JWT verification.
2. **Database**: Stores user information and authentication tokens.
3. **API**: Facilitates communication between the Android app and the web server for authentication.
4. **Android App**: Reads NFC cards and sends the JWT to the web server for authentication.

## Technologies Used

- **Backend**: Flask (Python) or Express (Node.js)
- **Database**: PostgreSQL or MySQL
- **Docker**: For containerizing the web server and database
- **Android**: Android Studio for app development
- **JWT**: JSON Web Token for secure token-based authentication

## Getting Started

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/yourusername/nfc-authentication-system.git
   ```
2. **Set Up Docker Environment**:
   - Navigate to the project directory.
   - Run `docker-compose up` to start the web server and database.
3. **Develop the Android App**:
   - Open the project in Android Studio.
   - Implement NFC reading and API communication.

## Contribution

Feel free to fork this repository and contribute by submitting pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
