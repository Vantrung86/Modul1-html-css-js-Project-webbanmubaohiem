function createUserAdmin(){
    //1. Lay dl tu local
    let users = JSON.parse(localStorage.getItem('users'))
    //2. thuc hien update User cu va them user admin moi
    let userAdmin = {
        id: crypto.randomUUID(),
        name: 'Admin',
        email:'dfsg@gmail.com',
        password: 'Thang12345^',
        status: '',
        role: 'admin'
    };
    // tao ra mang moi gom du lieu user cu + useradmin
    let userAll = [...users, userAdmin];
    //3. cap nhat role cho user thong thuong
    let userAllUpdate = userAll.map(
        function(item){
            if(item.role === 'admin'){
                return item;
            }
            else{
                item.role = 'regular';
                return item;
            }
        }
    )
    //4. cap nhat lai local
    let userAdminExit = users.find(item => item.role === 'admin');
    if(!userAdminExit){
        localStorage.setItem('users', JSON.stringify(userAllUpdate))
    }
}

// tao user admin
//role: admin -- role: regular
createUserAdmin();