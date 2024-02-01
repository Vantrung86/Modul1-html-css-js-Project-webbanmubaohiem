const tbodySelectorUser =document.querySelector('tbody.users-manager');
let users = JSON.parse(localStorage.getItem('users')) || [];
function rederUsersManager(){  
    let resultUser = '';
    for(let i=0; i < users.length; i++){
        if (i == 0) {
            resultUser = resultUser + `  <tr>
                                            <td>${i+1}</td>
                                            <td>${users[i].name}</td>
                                            <td>${users[i].email}</td>
                                            <td>${users[i].password}</td>
                                            <td>${users[i].status}</td>
                                        
                                        </tr>`
        }else{
            resultUser = resultUser + `  <tr>
                                            <td>${i+1}</td>
                                            <td>${users[i].name}</td>
                                            <td>${users[i].email}</td>
                                            <td>${users[i].password}</td>
                                            <td>${users[i].status}</td>
                                            <td>${users[i].status1}</td>                  
                                            <td>
                                        
                                            <a onclick="banUser(${i})" class="btn btn-fill-out ">Block</a>
                                            <a onclick="unBanUser(${i})" class="btn btn-fill-out ">unBlock</a>
                                            </td>
                                        </tr>`
        }
    }
    tbodySelectorUser.innerHTML = resultUser;
}
rederUsersManager();



// function handleDeleteUser(event){
//     let clicked = event.target;
//     let users = JSON.parse(localStorage.getItem('users'));
//     if(confirm('Bạn có chắc chắn muốn xoá user ?')){
//         if(clicked.classList.contains('btn-sm')){
//             let idDelete = clicked.getAttribute('data-id');
//             let usersDelete = users.filter(item => item.id !== idDelete);
//             localStorage.setItem('users', JSON.stringify(usersDelete));
//             rederUsersManager();
//         }
//     }
// }
//tbodySelectorUser.addEventListener('click', handleDeleteUser)
function banUser(index) {
    if (users[index].status1 =="normal") {
        users[index].status1 ="block"
    }
    localStorage.setItem('users', JSON.stringify(users));
    rederUsersManager();
}
function unBanUser(index) {
    if (users[index].status1 =="block") {
        users[index].status1 ="normal"
    }
    localStorage.setItem('users', JSON.stringify(users));
    rederUsersManager();
}


