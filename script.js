document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    let credentials = [];

    // 🔹 Load credentials from Google Sheets
    fetch("https://script.google.com/macros/s/AKfycby_v7HibvV27zwH5JA9Sgh4O8S8TF2QzUXBr7sfkUWFyoB7ell9ixa1X3GZJCZyu5nilQ/exec") // Replace with your actual Apps Script web app URL
        .then(res => res.json())
        .then(data => {
            credentials = data;
            console.log("Loaded credentials from Google Sheets:", credentials);
        })
        .catch(err => console.error("Error loading sheet data", err));

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateLogin();
    });

    function validateLogin() {
        const enteredUsername = document.getElementById('username').value.trim();
        const enteredPassword = document.getElementById('password').value.trim();

        // Find the matching user in the credentials array
        const user = credentials.find(
            c => c.Username === enteredUsername && c.Password === enteredPassword
        );

        if (user) {
            // Redirect to their URL
            window.location.href = user.RedirectURL;
        } else {
            alert("Login Failed. Please check your username and password.");
        }
    }
});
