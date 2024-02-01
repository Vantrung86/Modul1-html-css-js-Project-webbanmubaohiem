

function getUserLogin(){
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userLoggin = users.find(item => item.status === 'active');
    return userLoggin;
}


// function Tinh toan tong cart
function totalCartsNumber(){
    // lay user dang login
    let userLogin = getUserLogin();
    //lay cart cua user
    if(userLogin){
        let cartOfUser = userLogin.cart || []; //ko co cart thi lay mang rong
        // tinh tong so SP trong gio hang (tong quantity)
        let totalCart = 0;
        for(let i = 0; i < cartOfUser.length; i++){
            let quantity = cartOfUser[i].quantity;
            totalCart = totalCart + parseInt(quantity);
        }
        // hien thi so luong
        document.querySelector('.cart_count').innerHTML = totalCart
    }
}
totalCartsNumber()
