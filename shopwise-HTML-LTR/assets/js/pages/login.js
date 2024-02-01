const buttonLogin = document.querySelector(".btn-login");
const inputSelectorAll = document.querySelectorAll(".form-group .form-control");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const tooglePass = document.querySelector(".toogle_password");
const emailSelector = document.querySelector(".email");
const passwordSelector = document.querySelector(".password");

function ValidateEmail(valueInput) {
  let message = null;
  if (valueInput === "") {
    message = "email không được để trống";
  } else if (!emailRegex.test(valueInput)) {
    message = "email không đúng định dạng";
  }
  return message;
}

function ValidatePassword(valueInput) {
  let message = null;
  if (valueInput === "") {
    message = "password không được để trống";
  } else if (valueInput.length < 8) {
    message = "password phải có ít nhất 8 ký tự";
  } else if (!passwordRegex.test(valueInput)) {
    message = "password phải có ít nhất 1 ký tự hoa, thường, số , đặc biệt";
  }
  return message;
}

function handleLogin(event) {
  let message;
  let errorMessage = [];
  event.preventDefault();
  for (let i = 0; i < inputSelectorAll.length; i++) {
    let nameInput = inputSelectorAll[i].getAttribute("name");
    let valueInput = inputSelectorAll[i].value.trim();
    if (nameInput === "email") {
      message = ValidateEmail(valueInput);
    } else {
      message = ValidatePassword(valueInput);
    }
    let errorMessageSelector = inputSelectorAll[i]
      .closest(".form-group")
      .querySelector(".error_message");
    if (message === null) {
      inputSelectorAll[i].classList.remove("error");
      errorMessageSelector.innerText = "";
      inputSelectorAll[i]
        .closest(".form-group")
        .classList.remove("form-group_error");
    } else {
      inputSelectorAll[i].classList.add("error");
      errorMessageSelector.innerText = message;
      inputSelectorAll[i]
        .closest(".form-group")
        .classList.add("form-group_error");
      errorMessage.push(message);
    }
  }
  if (errorMessage.length === 0) {
    let users = JSON.parse(localStorage.getItem("users"));
    let isLoginExitIndex = -1;
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email === emailSelector.value &&
        users[i].password === passwordSelector.value
      ) {
        isLoginExitIndex = i;
        break;
      }
    }

    //thuc hien vao trang home hoac hien loi sai email va pass
    if (isLoginExitIndex !== -1) {
      //cap nhat status ---> active
      users[isLoginExitIndex].status = "active";
      localStorage.setItem("users", JSON.stringify(users));
      if (users[isLoginExitIndex].role === "admin") {
        window.location.href = "/admin.html";
      } else {
        if (users[isLoginExitIndex].status1 == "normal") {
        //  chuyen sang trang Home
           window.location.href = '/index.html';
        } else {
            alert("Tài khoản bị ban");
            return
        }
      }
    } else {
      //hien thi loi tren form
      document.querySelector(".alert-danger").innerText =
        "Email hoặc password không đúng";
      document.querySelector(".alert-danger").classList.remove("hide");
    }
  }
}

function handleEye(event) {
  let cliked = event.target;
  let typePass = document.querySelector(".password").getAttribute("type");
  if (typePass === "password") {
    typePass = "text";
    cliked.classList.remove("fa-eye-slash");
    cliked.classList.add("fa-eye");
  } else {
    typePass = "password";
    cliked.classList.add("fa-eye-slash");
    cliked.classList.remove("fa-eye");
  }
  document.querySelector(".password").setAttribute("type", typePass);
}

tooglePass.addEventListener("click", handleEye);
buttonLogin.addEventListener("click", handleLogin);
