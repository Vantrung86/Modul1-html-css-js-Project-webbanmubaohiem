const ulCategorySelector = document.querySelector('.widget_categories');
const paginationSelector = document.querySelector('.pagination');
// so luong san pham tren 1 trang
const perPage = 9;

function showCategory(){
    //1. lay tat ca danh muc trong local
    let category = JSON.parse(localStorage.getItem('category'));
    //2. xay dung cau truc html cho category
    let resultCategory = '';
    for(let i=0; i< category.length; i++){
        let categoryItem = category[i];
        resultCategory = resultCategory + `<li class="item_cate_click" data-category_id="${categoryItem.id}">
                                                <a href="">
                                                    <span class="categories_name">${categoryItem.name}</span>
                                                </a>
                                            </li>`
    }
    // dua category vao container
    ulCategorySelector.innerHTML = resultCategory;
}
showCategory()


function handleShowCategoryByTab(event) {
    event.preventDefault();
    let clicked = event.target;
    let liSelectorClicked = clicked.closest('.item_cate_click');
    //giới hạn click đến li
    if (liSelectorClicked.classList.contains('item_cate_click')) {
        //1. lấy category_id khi click vào danh mục
        let categoryId = liSelectorClicked.getAttribute('data-category_id');
        //2. lay tat ca san phan trong local
        let products = JSON.parse(localStorage.getItem('products'));
        //3. filter san pham theo danh muc input
        let productFilterByType = products.filter(
            function (item) {
                return item.category_id === categoryId   
            }
        )
        //4. thực hiện lấy dữ liệu theo trang hay là giới hạn sản phẩm khi filter
        // lay ra 1 san pham
        let productFilterPagination = productFilterByType.slice(0, perPage);
        //5. tạo ra mã html cho sản phẩm
        let resultHtml = '';
        for(let i=0; i < productFilterPagination.length; i++){
            let productItem = productFilterPagination[i]
            resultHtml = resultHtml + ` <div class="col-md-4 col-6">
                                            <div class="product">
                                                <div class="product_img">
                                                    <a href="/shop-product-detail.html?id=${productItem.id}">
                                                        <img src="${productItem.image}" alt="product_img1">
                                                    </a>
                                                    <div class="product_action_box">
                                                        <ul class="list_none pr_action_btn">
                                                            <li class="add-to-cart" data-id_product="${productItem.id}"><a href="#"><i class="icon-basket-loaded"></i>
                                                                    Add To Cart</a></li>
                                                            <li><a href="shop-compare.html" class="popup-ajax"><i
                                                                        class="icon-shuffle"></i></a></li>
                                                            <li><a href="shop-quick-view.html" class="popup-ajax"><i
                                                                        class="icon-magnifier-add"></i></a></li>
                                                            <li><a href="#"><i class="icon-heart"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="product_info">
                                                    <h6 class="product_title"><a href="/?id=${productItem.id}">${productItem.name}</a></h6>
                                                    <div class="product_price">
                                                        <span class="price">$${productItem.price}</span>
                                                        <del>$55.25</del>
                                                        <div class="on_sale">
                                                            <span>35% Off</span>
                                                        </div>
                                                    </div>
                                                    <div class="rating_wrap">
                                                        <div class="rating">
                                                            <div class="product_rate" style="width:80%"></div>
                                                        </div>
                                                        <span class="rating_num">(21)</span>
                                                    </div>
                                                    <div class="pr_desc">
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                                                            blandit massa enim. Nullam id varius nunc id varius nunc.</p>
                                                    </div>
                                                  
                                                    <div class="list_product_action_box">
                                                        <ul class="list_none pr_action_btn">
                                                            <li class="add-to-cart" data-id_product="${productItem.id}"><a href="#"><i class="icon-basket-loaded"></i>
                                                                    Add To Cart</a></li>
                                                            <li><a href="shop-compare.html" class="popup-ajax"><i
                                                                        class="icon-shuffle"></i></a></li>
                                                            <li><a href="shop-quick-view.html" class="popup-ajax"><i
                                                                        class="icon-magnifier-add"></i></a></li>
                                                            <li><a href="#"><i class="icon-heart"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`
        }
        //6. Thêm dữ liệu đến container
        document.querySelector('.shop_container').innerHTML = resultHtml; 
        //7. thực hiện hiển thị phân trang
        //7.1 tính toán tổng số trang
        let totalPage = Math.ceil((productFilterByType.length) / perPage);
        let htmlPagination = '';
        for(let i=1 ; i<= totalPage; i++){
            htmlPagination = htmlPagination + `<li class="page-item ${i === 1 ? 'active' : ''}">
                                                <a data-category_id = ${categoryId} data-page = ${i} class="page-link" href="">${i}</a></li>`
        }
        //7.2 Dua phan trang vao container
        document.querySelector('.pagination').innerHTML = htmlPagination 
        //xoa het class: active
        document.querySelectorAll('.item_cate_click').forEach(item => item.classList.remove('active'));
        // them class: active khi click
        liSelectorClicked.classList.add('active')
        //
    }
}
ulCategorySelector.addEventListener('click', handleShowCategoryByTab);

// Khi trang load lan dau tu dong click vao Li dau tien
document.querySelector('.widget_categories li:first-child').click();

function handleClickPageCategory(event){
    event.preventDefault();
    let clicked = event.target;
    if(clicked.classList.contains('page-link')){
        //input: lay trang dang click
        let page = clicked.getAttribute('data-page');
        //input: lay category_id de gioi han so Sp theo danh muc
        let categoryId = clicked.getAttribute('data-category_id');
        //process data
        //1. lay ra tat ca sp
        let products = JSON.parse(localStorage.getItem('products'));
        //2. lay tat ca sp theo category_id
        let productsFilter = products.filter(item => item.category_id === categoryId);
        //3. lay ra tat ca sp theo 1 page nao day
        let indexStart = (page - 1) * perPage;
        let indexEnd = page * perPage;
        let productsFilterPaginationByPage = productsFilter.slice(indexStart, indexEnd) ;
        //4.tao html
        let resultHtml ='';
        for(let i=0; i < productsFilterPaginationByPage.length; i++){
            let productItem = productsFilterPaginationByPage[i];
            resultHtml = resultHtml + ` <div class="col-md-4 col-6">
                                            <div class="product">
                                                <div class="product_img">
                                                    <a href="/shop-product-detail.html?id=${productItem.id}">
                                                        <img src="${productItem.image}" alt="product_img1">
                                                    </a>
                                                    <div class="product_action_box">
                                                        <ul class="list_none pr_action_btn">
                                                            <li class="add-to-cart" data-id_product="${productItem.id}"><a href="#"><i class="icon-basket-loaded"></i>
                                                                    Add To Cart</a></li>
                                                            <li><a href="shop-compare.html" class="popup-ajax"><i
                                                                        class="icon-shuffle"></i></a></li>
                                                            <li><a href="shop-quick-view.html" class="popup-ajax"><i
                                                                        class="icon-magnifier-add"></i></a></li>
                                                            <li><a href="#"><i class="icon-heart"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="product_info">
                                                    <h6 class="product_title"><a href="/shop-product-detail.html?id=${productItem.id}">${productItem.name}</a></h6>
                                                    <div class="product_price">
                                                        <span class="price">$${productItem.price}</span>
                                                        <del>$55.25</del>
                                                        <div class="on_sale">
                                                            <span>35% Off</span>
                                                        </div>
                                                    </div>
                                                    <div class="rating_wrap">
                                                        <div class="rating">
                                                            <div class="product_rate" style="width:80%"></div>
                                                        </div>
                                                        <span class="rating_num">(21)</span>
                                                    </div>
                                                    <div class="pr_desc">
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                                                            blandit massa enim. Nullam id varius nunc id varius nunc.</p>
                                                    </div>
                                                  
                                                    <div class="list_product_action_box">
                                                        <ul class="list_none pr_action_btn">
                                                            <li class="add-to-cart" data-id_product="${productItem.id}"><a href="#"><i class="icon-basket-loaded"></i>
                                                                    Add To Cart</a></li>
                                                            <li><a href="shop-compare.html" class="popup-ajax"><i
                                                                        class="icon-shuffle"></i></a></li>
                                                            <li><a href="shop-quick-view.html" class="popup-ajax"><i
                                                                        class="icon-magnifier-add"></i></a></li>
                                                            <li><a href="#"><i class="icon-heart"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`
        }
        //5.them dl 
        document.querySelector('.shop_container').innerHTML = resultHtml; 
        document.querySelectorAll('.page-item').forEach(item => item.classList.remove('active'));
        // them class: active khi click
        clicked.closest('.page-item').classList.add('active');
    }

}

paginationSelector.addEventListener('click', handleClickPageCategory)




