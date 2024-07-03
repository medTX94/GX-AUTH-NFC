document.addEventListener("DOMContentLoaded", function () {
    const userPassBtn = document.getElementById("userPassBtn");
    const nfcBtn = document.getElementById("nfcBtn");
    const userPassForm = document.getElementById("userPassForm");
    const nfcForm = document.getElementById("nfcForm");
    const loginForm = document.getElementById("loginForm");
    const scanNfcBtn = document.getElementById("scanNfcBtn");

    userPassBtn.addEventListener("click", function () {
        userPassForm.style.display = "block";
        nfcForm.style.display = "none";
    });

    nfcBtn.addEventListener("click", function () {
        userPassForm.style.display = "none";
        nfcForm.style.display = "block";
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        // Handle username and password authentication
        authenticateUser(username, password);
    });

    scanNfcBtn.addEventListener("click", function () {
        // Handle NFC authentication
        authenticateNfc();
    });

    function authenticateUser(username, password) {
        // Example function to handle username and password authentication
        // Replace with your own authentication logic
        fetch("http://localhost:5000/login", {  // Use your server IP or hostname
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Authentication successful!");
            } else {
                alert("Authentication failed!");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    function authenticateNfc() {
        // Example function to handle NFC authentication
        // Replace with your own NFC authentication logic
        alert("NFC authentication is not implemented in this example.");
    }
});