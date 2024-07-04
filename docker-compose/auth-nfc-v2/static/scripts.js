document.addEventListener("DOMContentLoaded", function () {
    const userPassBtn = document.getElementById("userPassBtn");
    const nfcBtn = document.getElementById("nfcBtn");
    const userPassForm = document.getElementById("userPassForm");
    const nfcForm = document.getElementById("nfcForm");
    const loginForm = document.getElementById("loginForm");
    const scanNfcBtn = document.getElementById("scanNfcBtn");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");

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

    function showPopup(message, success, username) {
        popupMessage.textContent = message;
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
            if (success) {
                window.location.href = `/home?username=${encodeURIComponent(username)}`;
            }
        }, 2000);
    }

    function authenticateUser(username, password) {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showPopup("Authentication successful!", true, username);
            } else {
                showPopup("Authentication failed!", false);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showPopup("Authentication failed!", false);
        });
    }

    async function authenticateNfc() {
        if ('NDEFReader' in window) {
            try {
                const ndef = new NDEFReader();
                await ndef.scan();
                ndef.onreading = event => {
                    const decoder = new TextDecoder();
                    for (const record of event.message.records) {
                        const token = decoder.decode(record.data);
                        fetch("/authenticate", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ token: token })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.message === "User authenticated") {
                                showPopup("Authentication successful!", true, data.user);
                            } else {
                                showPopup("Authentication failed!", false);
                            }
                        })
                        .catch(error => {
                            console.error("Error:", error);
                            showPopup("Authentication failed!", false);
                        });
                    }
                };
            } catch (error) {
                console.error("Error:", error);
                showPopup("NFC scan failed!", false);
            }
        } else {
            alert("NFC not supported on this device.");
        }
    }
});
