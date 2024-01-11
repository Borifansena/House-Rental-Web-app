function loginValidation(e) {
    e.preventDefault();
  
    // Retrieve form elements
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    const loginButton = document.querySelector("#login-btn");
  
    // Get user input
    const username = usernameInput.value;
    const password = passwordInput.value;
  
    // Perform validation (replace with your actual validation logic)
    if (username === "" || password === "") {
      alert("Please enter both username and password.");
      return; // Prevent further execution if fields are empty
    }
  
    // Send login data to server for authentication
    // ... (Replace with your authentication logic)
  
    // Example of handling a successful response:
    if (response.success) {
      window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
      alert("Invalid username or password.");
    }
  }
  
  // Attach event listener to the login button
  loginButton.addEventListener("click", loginValidation);
  


