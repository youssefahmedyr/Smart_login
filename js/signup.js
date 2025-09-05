let userName  = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userPass  = document.getElementById("uesrPass"); 
let signupBtn = document.getElementById("loginBtn");

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
  if (isError) {
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

if (userName) {
  userName.addEventListener("input", function() {
    userName.classList.remove("is-invalid");
    hideSimple();
  });
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

if (signupBtn) {
  signupBtn.addEventListener("click", function(e) {
    e.preventDefault();

    hideSimple();

    if (!userName || !userEmail || !userPass) {
      showSimple("Error: inputs not found", true);
    } else {
      let name  = userName.value.trim();
      let email = userEmail.value.trim();
      let pass  = userPass.value;

      if (!emailPattern.test(email)) {
        userEmail.classList.add("is-invalid");
        showSimple("Invalid email format. Example: user@example.com", true);
      } else if (!passPattern.test(pass)) {
        userPass.classList.add("is-invalid");
        showSimple("Password must be 8+ chars and include letters and numbers.", true);
      } else {
        let users = [];
        try {
          users = JSON.parse(localStorage.getItem("users")) || [];
        } catch (err) {
          users = [];
        }

        let exists = false;
        for (let i = 0; i < users.length; i++) {
          if (users[i].email === email) {
            exists = true;
            break;
          }
        }

        if (exists) {
          userEmail.classList.add("is-invalid");
          showSimple("Email already registered. Please sign in.", true);
        } else {
          let newUser = {
            name: name,
            email: email,
            password: pass
          };
          users.push(newUser);
          localStorage.setItem("users", JSON.stringify(users));
          showSimple("Account created successfully!", false);

          setTimeout(function() {
            window.location.href = "../index.html";
          }, 800);
        }
      }
    }
  });
}
