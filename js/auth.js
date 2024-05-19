// Define users statically at the top of the script
const users = [
  { email: 'example@email.com', password: 'password123' },
  // Add more users as needed
];

// Elements
let emailInput, passwordInput, submitBtn, result, spinner;

window.addEventListener('DOMContentLoaded', (event) => {
  emailInput = document.getElementById('emailInput');
  passwordInput = document.getElementById('passwordInput');
  submitBtn = document.getElementById('submitBtn');
  result = document.getElementById('result');
  spinner = document.getElementById('spinner');

  // Attach event listeners only after DOM is fully loaded
  submitBtn.addEventListener('click', submitHandler);
  const logoutLink = document.querySelector('a[title="Logout"]');
  if (logoutLink) {
      logoutLink.addEventListener('click', (event) => {
          event.preventDefault();
          logout();
      });
  }

  // Call checkSession to redirect logged-in users
  checkSession();
});

// Logout function
function logout() {
  sessionStorage.removeItem('user'); // Clear the user session
  window.location.href = '../signin.html'; // Redirect to the login page
}

// Check if user is already logged in
function checkSession() {
  const user = sessionStorage.getItem('user');
  if (user) {
      window.location.href = './dist/wallet.html'; // Redirect to the home page
  }
}

// Submit handler for login
function submitHandler() {
  // Show spinner, disable button
  spinner.style.display = 'block';
  submitBtn.disabled = true;

  // Clear previous errors
  result.innerHTML = '';

  // Get input values
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Find user in users array
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
      // Success case
      result.innerHTML = 'Login successful!';
      sessionStorage.setItem('user', JSON.stringify(user)); // Store user in session

      // Redirect to home page
      window.location.href = './dist/wallet.html';
  } else {
      // Show error
      result.innerHTML = 'Invalid username or password';
  }

  // Hide spinner, enable button
  spinner.style.display = 'none';
  submitBtn.disabled = false;
}