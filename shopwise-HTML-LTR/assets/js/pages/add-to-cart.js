const mainContentSelector = document.querySelector('.main_content');


function handleAddCart(event){
    
    //1. kt neu user chua login thi redirect den man hinh login
    let clicked = event.target;
    let liClicked = clicked.closest('li.add-to-cart');
    if(liClicked){
        event.preventDefault();
        let idProduct = liClicked.getAttribute('data-id_product');
        let products = JSON.parse(localStorage.getItem('products'));
        let product = products.find(item => item.id === idProduct);
        let userIsLogginning = getUserLogin();
        if(!userIsLogginning){
            window.location.href = '/login.html';
        }
        //2, chac chan da login thi thuc hien login add to cart
        //2.1 tao ra value cua cart[{san pham}]
        //user chua co cart nghia la co tai khoan nhung chua tung mua hang
        let cartOfUser = userIsLogginning.cart;
        let cart;
        if(!cartOfUser){
            cart  = [{...product, quantity: 1}]        
        }
        // da co key cart hay mua san pham khac
        else{
            // Kt SP chua co trong gio hang
            let productExit = cartOfUser.find(item => item.id === idProduct);
            // SP da co trong gio hang
            if(productExit){
                cart = cartOfUser.map(
                    function(item){
                        if(item.id === idProduct){
                            item.quantity = item.quantity + 1;
                            return item;
                        }
                        else{
                            return item;
                        }
                    }
                )
            }
            //SP chua co trong gio hang
            else{
                cart = [...cartOfUser, {...product, quantity: 1}]
            }
        }     
        //2.2 update user dang login hay co  status la active
        // them thuoc tinh cart cho user dang active
        let users = JSON.parse(localStorage.getItem('users'));
        let userUpdateCart = users.map(
            function(item){
                if(item.status === 'active'){
                    item.cart = cart;
                    return item;
                }
                else{
                    return item;
                }
            }
        )
        //2.3 cap nhat lai local cho users
        localStorage.setItem('users', JSON.stringify(userUpdateCart))
        totalCartsNumber()
    }  
}
mainContentSelector.addEventListener('click', handleAddCart)
