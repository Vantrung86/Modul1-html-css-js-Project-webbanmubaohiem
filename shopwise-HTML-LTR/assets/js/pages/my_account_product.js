const buttonSave = document.querySelector('.btn_save');
const nameSelector = document.querySelector('.name');
const priceSelector = document.querySelector('.price_product');
const imageSelector = document.querySelector('.image');
const descriptionSelector = document.querySelector('.description');
const tbodySelector = document.querySelector('tbody.product_table');
const categoryFormSelector = document.querySelector('.category_wrapper_form')


function handleAddProduct(event) {
    event.preventDefault();
    let validForm = true;
    let valueName = nameSelector.value.trim();
    let divError = nameSelector.nextElementSibling;

    if (valueName === '') {
        nameSelector.classList.add('error');
        divError.innerText = 'Tên không để trống';
        validForm = false;
    }
    else {
        nameSelector.classList.remove('error');
        divError.innerText = '';
    }
    let valueprice = priceSelector.value.trim();
    let dixNextErrPrice = priceSelector.nextElementSibling;
    if (valueprice === '') {
        priceSelector.classList.add('error');
        dixNextErrPrice.innerText = 'Giá không để trống';
        validForm = false;
    }
    else if (isNaN(valueprice) || valueprice < 0) {
        priceSelector.classList.add('error');
        dixNextErrPrice.innerText = 'Xin hãy nhập số dương';
        validForm = false;
    }
    else {
        priceSelector.classList.remove('error');
        dixNextErrPrice.innerText = '';
    }
    let valueImage = imageSelector.value.trim();
    let divErrorImage = imageSelector.nextElementSibling;
    if (valueImage === '') {
        imageSelector.classList.add('error');
        divErrorImage.innerText = 'Ảnh không để trống';
        validForm = false;
    }
    else {
        imageSelector.classList.remove('error');
        divErrorImage.innerText = '';
    }
    let valuedescription = descriptionSelector.value.trim();
    let divErrorDes = descriptionSelector.nextElementSibling;
    if (valuedescription === '') {
        descriptionSelector.classList.add('error');
        divErrorDes.innerText = 'Mô tả không để trống';
        validForm = false;
    }
    else {
        descriptionSelector.classList.remove('error');
        divErrorDes.innerText = '';
    }
    if (validForm) {
        if(event.target.classList.contains("update")) {
            let idUpdate = event.target.getAttribute("data-id");
            handleUpdateForm(idUpdate);
        }else {
            // data hop le chay ham nay
            handleSubmitForm()
        }
        document.querySelector('#form_save_product').reset();
    }
}

function handleUpdateForm(idUpdate){
    let products = JSON.parse(localStorage.getItem('products'));
    let indexUpdate = products.findIndex(
        function(item){
            return item.id === idUpdate
        }
    )
    let valueName = nameSelector.value.trim();
    let valueprice = priceSelector.value.trim();
    let valueImage = imageSelector.value.trim();
    let valuedescription = descriptionSelector.value.trim();
    let valueType = document.querySelector('.type_product:checked').value;
    let valueCategory = categoryFormSelector.value;


    products[indexUpdate].name = valueName;
    products[indexUpdate].price = valueprice;
    products[indexUpdate].image = valueImage;
    products[indexUpdate].description = valuedescription;
    products[indexUpdate].type = valueType;
    products[indexUpdate].category_id = valueCategory;

    localStorage.setItem('products', JSON.stringify(products))
    rederDataProduct();
    buttonSave.classList.remove('update');
    buttonSave.removeAttribute('data-id');

}
//Neu data hop le thi thuc thi ham nay
function handleSubmitForm() {
    //1. lay value input trong form
    let valueName = nameSelector.value.trim();
    let valueprice = priceSelector.value.trim();
    let valueImage = imageSelector.value.trim();
    let valuedescription = descriptionSelector.value.trim();
    //lây value checked
    let valueType = document.querySelector('.type_product:checked').value;
    //lấy value select
    let valueCategory = categoryFormSelector.value;
    

    //2. phan tich du lieu can luu ntn
    let products = [];
    if (localStorage.getItem('products') === null) {
        products = [];
    }
    else {
        products = JSON.parse(localStorage.getItem('products'))
    }

        let newproduct = {
            id: crypto.randomUUID(),
            name: valueName,
            price: valueprice,
            image: valueImage,
            description: valuedescription,
            type: valueType,
            category_id: valueCategory
        }
        //them sp vao mang
        products.push(newproduct);
        //luu vao local khi load trang ko mat dl
        localStorage.setItem('products', JSON.stringify(products))
    
        // hien thi du lieu local ra table
        rederDataProduct();
    }
    

//  render data, get from local
function rederDataProduct() {
    let products = JSON.parse(localStorage.getItem('products'));
    if (products) {
        let productResult = '';
        for (let i = 0; i < products.length; i++) {
            productResult = productResult + ` <tr>
                                                <td>${i+1}</td>
                                                <td>${products[i].name}</td>
                                                <td>${products[i].price}</td>
                                                <td>
                                                    <img src="${products[i].image}" alt="">
                                                </td>
                                                <td>
                                                    <button data-id="${products[i].id}" class="btn_common btn_edit">Edit</button>
                                                    <button data-id="${products[i].id}" class="btn_common btn_delete">Delete</button>
                                                </td>
                                            </tr>`
        }
        tbodySelector.innerHTML = productResult;
    }
}
//hien thi du lieu khi load trang ko bi mat
rederDataProduct();

buttonSave.addEventListener('click', handleAddProduct)


//tự làm
function handleTbody(event) {
    let clicked = event.target;
    // lay du lieu tu local
    let products = JSON.parse(localStorage.getItem('products'));
    if (clicked.classList.contains('btn_edit')) {
        //2.tim id
        let idEdit = clicked.getAttribute('data-id');
        let productEdit = products.find(           //tra ve 1 object,tim thay tra ve luon, =key
            function(item){
                return item.id === idEdit
            }
        )
        //3. dua d l object vao input
        nameSelector.value = productEdit.name;
        priceSelector.value = productEdit.price;
        imageSelector.value = productEdit.image;
        descriptionSelector.value = productEdit.description;
        let valueTypeEdditing = productEdit.type;
        document.querySelector(`input[value=${valueTypeEdditing}]`).checked =true;
        categoryFormSelector.value = productEdit.category_id;
        //4. them trang thai cho nut SAVE de biet update hay add
        buttonSave.classList.add('update');
        buttonSave.setAttribute('data-id', idEdit)
    }
    else if(clicked.classList.contains('btn_delete')){
        let confirmDelete = confirm('Bạn có chắc chắn muốn xoá ?');
        if(confirmDelete){
            //2.tim id can xoa
            let idDelete = clicked.getAttribute('data-id');
            //3.xoa object voi id click ra khoi mang
            let productRemove = products.filter(        //tra ve 1 or nhieu object, tim het
                function(item){
                  return item.id !== idDelete
                }
            )
            //4. cap nhat lai local
            localStorage.setItem('products', JSON.stringify(productRemove))
            //5. render lai danh sach tu local ra ngoai
            rederDataProduct();
            if(idDelete === buttonSave.getAttribute('data-id')){
                document.querySelector('#form_save_product').reset();
                buttonSave.classList.remove('update');
                buttonSave.removeAttribute('data-id');
            }
        }
    }  
}
tbodySelector.addEventListener('click', handleTbody)



function showCategoryInit(){
    //1. lay tat ca category tu local
    let category = JSON.parse(localStorage.getItem('category'))
    //2. ta ra option
    let resultOptionHtml = '<option value="">Chọn danh mục</option>';
    for( let i=0; i< category.length; i++){
        let categoryItem = category[i];
        resultOptionHtml = resultOptionHtml +`<option value="${categoryItem.id}">${categoryItem.name}</option>`
    }
    categoryFormSelector.innerHTML = resultOptionHtml
}
//Hamf taoj ra option đưa vào category
showCategoryInit();



const inputSearchSelector = document.querySelector('.search-input');
const buttonSearchproduct = document.querySelector('.btn-search');
function handleSearchClickSelector(){
    let valueSearch = inputSearchSelector.value.toLowerCase();
    let products = JSON.parse(localStorage.getItem('products'));
    let productsFilter = products.filter(
        function(item){
            return item.name.toLowerCase().indexOf(valueSearch) !== -1;           
        }
    )
    let result = '';
    for (let i = 0; i < productsFilter.length; i++) {
        result = result +  ` <tr>
                                <td>${productsFilter[i].name}</td>
                                <td>${productsFilter[i].price}</td>
                                <td>
                                    <img src="${productsFilter[i].image}" alt="">
                                </td>
                                <td>
                                    <button data-id="${productsFilter[i].id}" class="btn_common btn_edit">Edit</button>
                                    <button data-id="${productsFilter[i].id}" class="btn_common btn_delete">Delete</button>
                                </td>
                            </tr>`
    }
    tbodySelector.innerHTML = result;
}
buttonSearchproduct.addEventListener('click', handleSearchClickSelector);
inputSearchSelector.addEventListener('keyup', handleSearchClickSelector);