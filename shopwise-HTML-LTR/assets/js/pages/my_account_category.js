const selectorButton = document.querySelector('.btn_category_save');
const selectorName = document.querySelector('.category_name');
const selectorTbody = document.querySelector('tbody.category_table');


function handleCategory(event) {
    event.preventDefault();
    let validForm = true;
    let nameValue = selectorName.value.trim();
    let divError = selectorName.nextElementSibling;
    if (nameValue === '') {
        selectorName.classList.add('error');
        divError.innerText = 'Tên không để trống';
        validForm = false;
    }
    else {
        selectorName.classList.remove('error');
        divError.innerText = '';
    }
    if (validForm) {
        if(event.target.classList.contains("update")) {
            let idUpdate = event.target.getAttribute("data-id");
            handleUpdateCategory(idUpdate);
        }else {
            handleSubmitCategory()
        }
        document.querySelector('#form_save_category').reset();
    }
}
selectorButton.addEventListener('click', handleCategory);


function handleUpdateCategory(idUpdate){
    let category = JSON.parse(localStorage.getItem('category'));

    //Ham map: loop qua cac phan tu trong mang
    //item chinh la value cua cac phan tu
    //no tra ve mang moi voi cac gia tri return moi lan loop qua duoc push vao
    // let resultCate = category.map(
    //     function(item){
    //         if(item.id === idUpdate){
    //             return{
    //                 id: item.id,
    //                 name: nameValue
    //             }
    //         }else{
    //             return item;
    //         }
    //     }
    // )    sau do dua DL vao local roi render ra

    let indexUpdate = category.findIndex(
        function(item){
            return item.id === idUpdate
        }
    )
    let nameValue = selectorName.value.trim();
    category[indexUpdate].name = nameValue;
    //dua DL vao local
    localStorage.setItem('category', JSON.stringify(category));
    //render DL theo lacal
    rederDataCategory();
    //reset den trang thai Add
    selectorButton.classList.remove('update');
    selectorButton.removeAttribute('data-id')
}



function handleSubmitCategory() {
    let nameValue = selectorName.value.trim();
    let category = [];
    if (localStorage.getItem('category') === null) {
        category = [];
    }
    else {
        category = JSON.parse(localStorage.getItem('category'))
    }
    let newcategory = {
        id: crypto.randomUUID(),
        name: nameValue,
    }
    category.push(newcategory);
    localStorage.setItem('category', JSON.stringify(category));

    // hien thi du lieu local ra table
    rederDataCategory();
}

function rederDataCategory() {
    let category = JSON.parse(localStorage.getItem('category'));
    if (category) {
        let Result = '';
        for (let i = 0; i < category.length; i++) {
            Result = Result + ` <tr>
                                    <td>${i+1}</td>
                                    <td>${category[i].name}</td>
                                    <td>
                                        <button data-id="${category[i].id}" class="btn_common btn_edit">Edit</button>
                                        <button data-id="${category[i].id}" class="btn_common btn_delete">Delete</button>
                                    </td>
                                </tr>`
        }
        selectorTbody.innerHTML = Result;
    }
}
rederDataCategory();

function handleEditDelete(event){
    let clicked = event.target;
    //1. lay dl tu local
    let category = JSON.parse(localStorage.getItem('category'));
    if(clicked.classList.contains('btn_delete')){
        let confirmDelete = confirm('Bạn có chắc chắn muốn xoá ?');
        if(confirmDelete){
            //2.tim id can xoa
            let idDelete = clicked.getAttribute('data-id');
            //3.xoa object voi id click ra khoi mang
            let categoryRemove = category.filter(        //tra ve 1 or nhieu object, tim het
                function(item){
                  return item.id !== idDelete
                }
            )
            //4. cap nhat lai local
            localStorage.setItem('category', JSON.stringify(categoryRemove))
            //5. render lai danh sach tu local ra ngoai
            rederDataCategory();
        }
    }  
    else if (clicked.classList.contains('btn_edit')) {
        //2.tim id
        let idEdit = clicked.getAttribute('data-id');
        let categoryEdit = category.find(           //tra ve 1 object,tim thay tra ve luon, =key
            function(item){
                return item.id === idEdit
            }
        )
        //3. dua d l object vao input
        selectorName.value = categoryEdit.name;
        //4. them trang thai cho nut SAVE de biet update hay add
        selectorButton.classList.add('update');
        selectorButton.setAttribute('data-id', idEdit)
    }
}
selectorTbody.addEventListener('click', handleEditDelete)