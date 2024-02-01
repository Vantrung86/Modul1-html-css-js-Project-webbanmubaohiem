
// const loginInforSelector = document.querySelector('.user_login');
const loginInforSelector = document.querySelector('.header_list .ti-user').nextElementSibling;

function getUserIsLoggin() {
    //1. get data from localStorege
    let users = JSON.parse(localStorage.getItem('users'))
    //2. kiem tra xem co users active hay ko
    if (users) {
        let userFind = users.find(
            function (userItem) {
                if (userItem.status === 'active') {
                    return true;
                }
                else {
                    return false;
                }
            }
        )
        if (userFind) {
            loginInforSelector.innerText = userFind.name;
            loginInforSelector.closest('a').setAttribute('href', userFind.role==='admin' ? '/admin.html' : '/my-account.html')
        }

    }
}
getUserIsLoggin()