//1. đặt nơi để các biến lưu trữ(querySelector....)
const buttonRegister = document.querySelector('.btn-signup');
const nameSelector = document.querySelector('.name');
const emailSelector = document.querySelector('.email');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordSelector = document.querySelector('.password');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/; //it nhat 1ky tu thuong,1ky tu hoa, 1ky tu so,tong tu 8 ky tu tro di
const confirmPasswordSelector = document.querySelector('.confirm_password');
const tooglePass = document.querySelector('.toogle_password');
const tooglePassConfirm = document.querySelector('.toogle_passwordConfirm')


function showError(input, message) {
    input.classList.remove('success');
    input.classList.add('error');
    let messageInput = input.nextElementSibling;
    messageInput.innerText = message;
    //them class error cho paren
    input.closest('.form-group').classList.add('form-group_error'); //can chinh eye
}

function showSuccess(input) {
    input.classList.add('success');
    input.classList.remove('error');
    let messageInput = input.nextElementSibling;
    messageInput.innerText = '';
    input.closest('.form-group').classList.remove('form-group_error'); //can chinh eye
}

//2. nơi khai báo các hàm lắng nge sự kiện hoặc hàm chạy lần đầu load trang
function handleSignup(event) {
    event.preventDefault(); //ngăn cản hành động mặc định submit khi nhấn button submit
    //.trim cắt khoảng trắng 2 đầu

    //validate name
    let isNameValid = validateName()
    //validate email
    let isEmailValid = validateEmail()
    //validate password
    let isPasswordValid = validatePassword()
    //validate confirm password
    let isConfirmPasswordValid = validateConfirmPassword()
    //khi tất cả validate hợp lệ chúng ta mới lưu trữ data
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        // truoc khi push vao phai lay thong tin ra
        let usersBefore;
        // chua co data trong local
        if (localStorage.getItem('users') === null) {
            usersBefore = [];
        }
        // da co data trong local
        else {
            usersBefore = JSON.parse(localStorage.getItem('users'))
        }
        //kiem tra email ko bi trung moi dua vao local
        let isEmailUnique = true;
        for (let i = 0; i < usersBefore.length; i++) {
            if (usersBefore[i].email === emailSelector.value) {
                isEmailUnique = false;
                break;
            }
        }
        if (isEmailUnique) {
            let objUser = {
                id: crypto.randomUUID(),
                name: nameSelector.value,
                email: emailSelector.value,
                password: passwordSelector.value,
                status: "", 
                role: 'regular',
                status1: "normal"

            }
            usersBefore.push(objUser);
            localStorage.setItem('users', JSON.stringify(usersBefore))
            // chuyển sang trang login
            window.location.href = '/login.html';
        }else{
            alert('email them vao da ton tai')
        }
    }
}
// Ham nay xu lys show hide password
function handleTooglePass(event) {
    let typePass = passwordSelector.getAttribute('type');
    let clicked = event.target;
    if (typePass === 'password') {
        typePass = 'text';
        clicked.classList.remove('fa-eye-slash');
        clicked.classList.add('fa-eye');
    }
    else {
        typePass = 'password';
        clicked.classList.add('fa-eye-slash');
        clicked.classList.remove('fa-eye');
    }
    passwordSelector.setAttribute('type', typePass);
}

function handleTooglePassConfirm(event){
    let typePassConfirm = confirmPasswordSelector.getAttribute('type');
    let clicked = event.target;
    if (typePassConfirm === 'password') {
        typePassConfirm = 'text';
        clicked.classList.remove('fa-eye-slash');
        clicked.classList.add('fa-eye');
    }
    else {
        typePassConfirm = 'password';
        clicked.classList.add('fa-eye-slash');
        clicked.classList.remove('fa-eye');
    }
    confirmPasswordSelector.setAttribute('type', typePassConfirm);

}
tooglePassConfirm.addEventListener('click', handleTooglePassConfirm)

function validateName() {
    let isValidate = false;
    let valueName = nameSelector.value.trim();
    if (valueName === '') {
        showError(nameSelector, 'Tên không được để trống');
    }
    else {
        isValidate = true;
        showSuccess(nameSelector);
    }
    return isValidate;
}

function validateEmail() {
    let isValidate = false;
    let valueEmail = emailSelector.value.trim();
    if (valueEmail === '') {
        showError(emailSelector, 'email không được để trống');
    }
    else if (!emailRegex.test(valueEmail)) {
        showError(emailSelector, 'email không đúng định dạng');
    }
    else {
        isValidate = true;
        showSuccess(emailSelector);
    }
    return isValidate;
}

function validatePassword() {
    let isValidate = false;
    let passwordValue = passwordSelector.value.trim();
    if (passwordValue === '') {
        showError(passwordSelector, 'password không được để trống');
    }
    else if (passwordValue.length < 8) {
        showError(passwordSelector, 'Mật khẩu phải có ít nhất 8 ký tự');
    }
    else if (!passwordRegex.test(passwordValue)) {
        showError(passwordSelector, 'Mật khẩu phải có ít nhất 1 ký tự hoa, thường, số , đặc biệt');
    }
    else {
        isValidate = true;
        showSuccess(passwordSelector);
    }
    return isValidate;
}

function validateConfirmPassword() {
    let isValidate = false;
    let confirmPasswordValue = confirmPasswordSelector.value.trim();
    let passwordValue = passwordSelector.value.trim();
    if (confirmPasswordValue === '') {
        showError(confirmPasswordSelector, 'conrirm password không được trống');
    }
    else if (confirmPasswordValue.length < 8) {
        showError(confirmPasswordSelector, 'Xác nhận mật khẩu phải có ít nhất 8 ký tự');
    }
    else if (!passwordRegex.test(confirmPasswordValue)) {
        showError(confirmPasswordSelector, 'Xác nhận mật khẩu phải có ít nhất 1 ký tự hoa, thường, số , đặc biệt');
    }
    else if (passwordValue !== confirmPasswordValue) {
        showError(confirmPasswordSelector, 'conrirm password không trùng với pasword');
    }
    else {
        isValidate = true;
        showSuccess(confirmPasswordSelector);
    }
    return isValidate;
}
//3.nơi chạy hàm hoặc thêm addEvenLisner
//khi nhan vao button register
buttonRegister.addEventListener('click', handleSignup);
//khi nhan vao icon show hide password
tooglePass.addEventListener('click', handleTooglePass);

//bat su kien keyup cho input name
nameSelector.addEventListener('keyup', validateName);
emailSelector.addEventListener('keyup', validateEmail);
passwordSelector.addEventListener('keyup', validatePassword);
confirmPasswordSelector.addEventListener('keyup', validateConfirmPassword);