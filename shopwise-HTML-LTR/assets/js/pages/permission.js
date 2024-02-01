//Neu la user thong thuong thi an product, category, order di

function hideManagementIfIsUserRegular(){
    let users = JSON.parse(localStorage.getItem('users'));
    let userLogin = users.find(item => item.status === 'active');
    if(userLogin.role !== 'admin'){
        // an quan ly san pham
        document.querySelector('#dashboard-tab').closest('li').remove();
        // an quan ly order
        document.querySelector('#orders-tab').closest('li').remove();
        // an danh muc san pham
        document.querySelector('#address-tab').closest('li').remove();       
    }
    // them active cho li dau tien
    document.querySelector('.dashboard_menu ul li:first-child a').click();
}
hideManagementIfIsUserRegular()