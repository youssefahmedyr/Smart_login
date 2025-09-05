let welcomeMsg = document.getElementById("welcomeMsg");
let logoutBtn  = document.getElementById("logoutBtn");

let currentUser = null;
try {
  currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
} catch (err) {
  currentUser = null;
}

if (currentUser && welcomeMsg) {
  welcomeMsg.textContent = "Welcome " + currentUser.name;
} else {
  window.location.href = "../index.html";
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../index.html"; 
  });
}
