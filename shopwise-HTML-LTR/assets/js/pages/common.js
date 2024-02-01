//nếu đã login thì ko cho vào trang login và register


function redirectToHomePageIFLogeed() {
    //1. get data from localStorege
    let users = JSON.parse(localStorage.getItem('users'))
    //2. kiem tra xem co users active hay ko
    let userFind =users.find(
        function(userItem){
            if(userItem.status === 'active'){
                return true;
            }
            else{
                return false;
            }
        }
    )
    // console.log(userFind);
    if(userFind){
        //redirect To Home Page
        window.location.href = '/index.html'
    }
}
redirectToHomePageIFLogeed()