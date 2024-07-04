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
        authenticateUser(username, password);
    });

    scanNfcBtn.addEventListener("click", function () {
        authenticateNfc();
    });

    function authenticateUser(username, password) {
        fetch("/login", {  // Use your server IP or hostname
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
                window.location.href = '/home';
            } else {
                alert("Authentication failed!");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    function authenticateNfc() {
        if ('NDEFReader' in window) {
            const ndef = new NDEFReader();
            ndef.scan().then(() => {
                document.getElementById('nfcForm').innerHTML = "<p>Scan your NFC card...</p>";
                ndef.onreading = event => {
                    const decoder = new TextDecoder();
                    for (const record of event.message.records) {
                        const payload = decoder.decode(record.data);
                        sendNfcToken(payload);
                    }
                };
            }).catch(error => {
                alert(`Error: ${error}`);
            });
        } else {
            alert("NFC not supported on this device");
        }
    }

    function sendNfcToken(token) {
        fetch("/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("NFC Authentication successful!");
                window.location.href = '/home';
            } else {
                alert("NFC Authentication failed!");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
});