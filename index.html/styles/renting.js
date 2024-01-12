// Get references to the form elements
const form = document.querySelector('form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const priceInput = document.getElementById('price-input');
const rentBtn = document.getElementById('rent-btn');

// Function to validate the form
function validateForm() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const price = priceInput.value;

  // Check for empty fields
  if (email === '' || password === '' || price === '') {
    alert('Please fill in all fields.');
    return false;
  }

  // Implement more validation rules as needed, e.g., for email format
  // or password strength.

  return true;
}

// Add event listener to the rent button
rentBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default form submission

  if (validateForm()) {
    // Submit the form using AJAX or a server-side language
    // for actual authentication and rental processing
    console.log('Form submitted with valid data:', emailInput.value, passwordInput.value, priceInput.value);

    // Simulate successful rental for demonstration purposes
    alert('You have successfully rented your house!');

    // Clear form fields after successful submission (optional)
    emailInput.value = '';
    passwordInput.value = '';
    priceInput.value = '';
  }
});
