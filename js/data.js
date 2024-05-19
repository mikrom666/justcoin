// Data file 
const DATA_FILE = '../js/data.json';

// DOM elements
const userNameEl = document.getElementById('user-name');
const balanceEl = document.getElementById('balance');
const transactionsEl = document.getElementById('transactions');
const userIdEl = document.getElementById('user-id');
const lastLoginEl = document.getElementById('last-login');
const emailEl = document.getElementById('user-email');



// Fetch user data from JSON file
async function fetchUserData() {
  const resp = await fetch(DATA_FILE);
  return await resp.json(); 
}

// Update user name
function updateUserName(user) {
  userNameEl.innerText = user.name;
  emailEl.innerText = user.email;
  userIdEl.innerText = user.id;
  lastLoginEl.innerText = user.lastLogin;
  

} 

// Update user profile
function updateProfile(user) {
    userNameEl.innerText = user.name;
    userIdEl.innerText = user.id;
    lastLoginEl.innerText = user.lastLogin;
    emailEl.innerText = user.email;
}
  
  // Initialize 
  async function init() {
    const data = await fetchData();
    updateProfile(data.user); 
  }


// Fetch balance
async function fetchBalance() {
  const resp = await fetch(DATA_FILE);
  const data = await resp.json();
  const userBalance = data.user.balance;

  return data.user.balance; 
}

// Update balance
async function updateBalance() {
  const balance = await fetchBalance();

  balanceEl.innerText = balance;
}

// Get live BTC price
async function getBtcPrice() {
  const apiUrl = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD';

  const resp = await fetch(apiUrl);
  const data = await resp.json();

  return data.USD;
}

// Calculate USD balance
async function calculateUsdBalance() {
  const btcBalance = await fetchBalance();
  const btcPrice = await getBtcPrice();

  const usdBalance = btcBalance * btcPrice;

  return usdBalance;
}

// Update balance on interval
setInterval(async () => {
  const usdBalance = await calculateUsdBalance();

  balanceEl.innerText = `$${usdBalance.toFixed(2)}`;

}, 30000); // 30 seconds 



// Update initData
async function initData() {

    const data = await fetchUserData();
  
    updateUserName(data.user);
  
    // Call new balance update
    updateBalance();
  
    updateProfile(data.user);
  
  }
  
  
  // Update balance on interval
  setInterval(async () => {
  
    const balance = await calculateUsdBalance();
    
    updateBalance(balance);
  
  }, 30000);
  
  
  // Initialize
  initData();
