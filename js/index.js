
let userEmail = document.getElementById("userEmail");
let userPass  = document.getElementById("uesrPass");
let loginBtn   = document.getElementById("loginBtn");
let simpleMsg = document.createElement("p");

simpleMsg.style.marginTop = "6px";
simpleMsg.style.fontWeight = "600";
simpleMsg.style.display = "none";
if (userPass && userPass.parentNode) {
  userPass.parentNode.insertBefore(simpleMsg, userPass.nextSibling);
}

let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passPattern  = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

function showSimple(msg, isError) {
  simpleMsg.textContent = msg;
  simpleMsg.style.display = "block";
  if (isError === true) {
    simpleMsg.style.color = "#dc3545";
  } else {
    simpleMsg.style.color = "#198754";
  }
}
function hideSimple() {
  simpleMsg.style.display = "none";
  simpleMsg.textContent = "";
  simpleMsg.style.color = "";
}

if (userEmail) {
  userEmail.addEventListener("input", function() {
    userEmail.classList.remove("is-invalid");
    hideSimple();
  });
}
if (userPass) {
  userPass.addEventListener("input", function() {
    userPass.classList.remove("is-invalid");
    hideSimple();
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", function(e) {
    e.preventDefault();

    hideSimple();

    let stop = false;

    if (!userEmail || !userPass) {
      stop = true;
      showSimple("Error: inputs not found", true);
    }

    let email = "";
    let pass  = "";
    if (stop === false) {
      email = userEmail.value.trim();
      pass  = userPass.value;
    }

    if (stop === false) {
      if (!emailPattern.test(email)) {
        userEmail.classList.add("is-invalid");
        showSimple("Invalid email format. Use: user@example.com", true);
        stop = true;
      }
    }

    if (stop === false) {
      if (!passPattern.test(pass)) {
        userPass.classList.add("is-invalid");
        showSimple("Password must be 8+ chars and include letters and numbers.", true);
        stop = true;
      }
    }

    let users = [];
    if (stop === false) {
      try {
        users = JSON.parse(localStorage.getItem("users")) || [];
      } catch (err) {
        users = [];
      }
      if (!Array.isArray(users) || users.length === 0) {
        userEmail.classList.add("is-invalid");
        userPass.classList.add("is-invalid");
        showSimple("No accounts found. Please sign up.", true);
        stop = true;
      }
    }

    let user = null;
    if (stop === false) {
      user = users.find(function(u) { return u.email === email; }) || null;
      if (!user) {
        userEmail.classList.add("is-invalid");
        showSimple("Email not found. Please sign up first.", true);
        stop = true;
      }
    }

    if (stop === false) {
      if (user.password !== pass) {
        userPass.classList.add("is-invalid");
        showSimple("Wrong password. Try again.", true);
        stop = true;
      }
    }

    if (stop === false) {
      showSimple("Success — Redirecting...", false);
      localStorage.setItem("currentUser", JSON.stringify(user));
      setTimeout(function() {
        window.location.href = "html/home.html"; 
      }, 600);
    }

  });
}
