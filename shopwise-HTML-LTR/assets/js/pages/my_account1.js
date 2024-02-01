const logoutSelector = document.querySelector('.logout-user');
const loginInforSelector = document.querySelector('.user_login');


function handleLogout(event) {
    event.preventDefault();
    if(confirm('Bạn có chắc chắn muốn logout')){
        //1. lay ra tat ca user trong localStorage
        let users = JSON.parse(localStorage.getItem('users'));
        //2, update tat ca status = ''
        for (let i = 0; i < users.length; i++) {
            users[i].status = '';
        }
        //3. cap nhat lai localStorage
        localStorage.setItem('users', JSON.stringify(users));
        //4. chuyen ve login
        window.location.href = '/index.html'
    }
}


function getUserIsLoggin() {
    //1. get data from localStorege
    let users = JSON.parse(localStorage.getItem('users'))
    //2. kiem tra xem co users active hay ko
    let userFind;
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
        if (userFind && loginInforSelector) {
            loginInforSelector.innerText = userFind.name;
        }
    }
}
getUserIsLoggin()
logoutSelector.addEventListener('click', handleLogout);