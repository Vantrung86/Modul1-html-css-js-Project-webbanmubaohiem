const ulTabSelector = document.querySelector('.product_tab_click');
const inputSelectorProduct = document.querySelector('.form-control');
const searchSelectorProduct = document.querySelector('.search_icon')


function handleShowProductByTab(event) {
    let clicked = event.target;
    if (clicked.classList.contains('product_item_tab')) {
        let productType = clicked.getAttribute('data-type');
        //1.lay tat ca san pham trong local
        let products = JSON.parse(localStorage.getItem('products'));
        let productFilterByType = products.filter(
            function (item) {
                return item.type === productType
            }
        )
            //giới hạn 8 phần tử
        let productFilterByTypeLimit = productFilterByType.splice(0, 8);

            //
        let resultHtml = renderProduct(productFilterByTypeLimit)  //
        let objMapping = {
            new_arrival: '#arrival',
            best_sellers: '#sellers',
            featured: '#featured',
            special_offer: '#special'
        }
        let idContainer = objMapping[productType] + ' ' + '.shop_container';
        document.querySelector(idContainer).innerHTML = resultHtml;

        // document.querySelector(objMapping[productType]).querySelector('.shop_container').innerHTML = resultHtml;

        // if(productType === 'new_arrival'){
        //     document.querySelector('#arrival .shop_container').innerHTML = resultHtml;
        // }
        // else if(productType === 'best_sellers'){
        //     document.querySelector('#sellers .shop_container').innerHTML = resultHtml;
        // }
        // else if(productType === 'featured'){
        //     document.querySelector('#featured .shop_container').innerHTML = resultHtml;
        // }
        // else if(productType === 'special_offer'){
        //     document.querySelector('#special .shop_container').innerHTML = resultHtml;
        // }
    }
}
function renderProduct(productFilterByTypeLimit) {
    //2. hien thi anh
    let resultHtml = '';
    for (let i = 0; i < productFilterByTypeLimit.length; i++) {
        let productItem = productFilterByTypeLimit[i]
        resultHtml = resultHtml + `<div class="col-lg-3 col-md-4 col-6">
                                         <div class="product">
                                             <div class="product_img">
                                                 <a href="/shop-product-detail.html?id=${productItem.id}">
                                                     <img src="${productItem.image}" alt="product_img1">
                                                 </a>
                                                 <div class="product_action_box">
                                                     <ul class="list_none pr_action_btn">
                                                         <li data-id_product="${productItem.id}" class="add-to-cart"><a href=""><i class="icon-basket-loaded"></i> Add To Cart</a></li>
                                                         <li><a href="shop-compare.html" class="popup-ajax"><i class="icon-shuffle"></i></a></li>
                                                         <li><a href="shop-quick-view.html" class="popup-ajax"><i class="icon-magnifier-add"></i></a></li>
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
                                                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.</p>
                                                 </div>
                                                
                                             </div>
                                         </div>
                                     </div>`
    }
    return resultHtml;
}

// function loadDataArival() {
//     //1.lay tat ca san pham trong local
//     let products = JSON.parse(localStorage.getItem('products'));
//     let productFilterByType = products.filter(
//         function (item) {
//             return item.type === "new_arrival"
//         }
//     )
//     let resultHtml = renderProduct(productFilterByType)
//     document.querySelector('#arrival .shop_container').innerHTML = resultHtml;
// }


//ham lay arival lan dau load trang
// loadDataArival();
ulTabSelector.addEventListener('click', handleShowProductByTab);
//hàm tự động click vào tab đầu tiên
document.querySelector('a[href="#arrival"]').click();  //thay cho hàm loadDataArival()





// Featured Products c1
// function renderFeaturedProducts(){
//     let products = JSON.parse(localStorage.getItem('products'));
//     let productFilterByType = products.filter((item) => item.type === 'featured');
//     let resultHtml = '';
//     for(i = 0; i < productFilterByType.length; i++){
//         let productItem = productFilterByType[i];
//         resultHtml = resultHtml + `	<div class="item">
//                                         <div class="product">
//                                             <div class="product_img">
//                                                 <a href="/shop-product-detail.html?id=${productItem.id}">
//                                                     <img src="${productItem.image}" alt="exclusive_products_5.jpg">
//                                                 </a>
//                                                 <div class="product_action_box">
//                                                     <ul class="list_none pr_action_btn">
//                                                         <li class="add-to-cart" data-id_product="${productItem.id}"><a href="#"><i class="icon-basket-loaded"></i> Add To Cart</a></li>
//                                                         <li><a href="shop-compare.html" class="popup-ajax"><i class="icon-shuffle"></i></a></li>
//                                                         <li><a href="shop-quick-view.html" class="popup-ajax"><i class="icon-magnifier-add"></i></a></li>
//                                                         <li><a href="#"><i class="icon-heart"></i></a></li>
//                                                     </ul>
//                                                 </div>
//                                             </div>
//                                             <div class="product_info">
//                                                 <h6 class="product_title"><a href="/shop-product-detail.html?id=${productItem.id}">${productItem.name}</a></h6>
//                                                 <div class="product_price">
//                                                     <span class="price">$${productItem.price}</span>
//                                                     <del>$55.25</del>
//                                                     <div class="on_sale">
//                                                         <span>35% Off</span>
//                                                     </div>
//                                                 </div>
//                                                 <div class="rating_wrap">
//                                                     <div class="rating">
//                                                         <div class="product_rate" style="width:80%"></div>
//                                                     </div>
//                                                     <span class="rating_num">(21)</span>
//                                                 </div>
//                                                 <div class="pr_desc">
//                                                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>`
//     }
//     document.querySelector('.owl-carousel').innerHTML = resultHtml;
// }
// renderFeaturedProducts()


//c2

function loadProductFeature(){
    let products = JSON.parse(localStorage.getItem('products'));
    let productFilterByType = products.filter((item) => item.type === 'featured');
    let productFilterByTypeLimit = productFilterByType.splice(0, 12);   //lấy 12 phần tử
    let resultHtmlArr = [];
    for(let i=0; i<productFilterByTypeLimit.length; i++){
        let productItem = productFilterByTypeLimit[i];
        let htmlItem = `	<div class="item">
                            <div class="product">
                                <div class="product_img">
                                    <a href="/shop-product-detail.html?id=${productItem.id}">
                                        <img src="${productItem.image}" alt="exclusive_products_5.jpg">
                                    </a>
                                    <div class="product_action_box">
                                        <ul class="list_none pr_action_btn">
                                            <li class="add-to-cart" data-id_product="${productItem.id}"><a href="#"><i class="icon-basket-loaded"></i> Add To Cart</a></li>
                                            <li><a href="shop-compare.html" class="popup-ajax"><i class="icon-shuffle"></i></a></li>
                                            <li><a href="shop-quick-view.html" class="popup-ajax"><i class="icon-magnifier-add"></i></a></li>
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
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.</p>
                                    </div>
                                </div>
                            </div>
                        </div>`
        resultHtmlArr.push(htmlItem)
    }
    let resultHtml = resultHtmlArr.join('');
    document.querySelector('.product_slider').innerHTML = resultHtml;
}
loadProductFeature()




function handleSearchClick(event){
    event.preventDefault();
    let valueInput = inputSelectorProduct.value.toLowerCase();
    let products = JSON.parse(localStorage.getItem('products'));
    let productsFilter = products.filter(item => item.name.toLowerCase().indexOf(valueInput) !== -1);
    let result = '';
    for(let i=0; i< productsFilter.length; i++){
        let productItem = productsFilter[i];
        result = result + `<div class="col-lg-3 col-md-4 col-6">
                                <div class="product">
                                    <div class="product_img">
                                        <a href="/shop-product-detail.html?id=${productItem.id}">
                                            <img src="${productItem.image}" alt="product_img1">
                                        </a>
                                        <div class="product_action_box">
                                            <ul class="list_none pr_action_btn">
                                                <li class="add-to-cart" data-id_product="${productItem.id}"><a href="#"><i class="icon-basket-loaded"></i> Add To Cart</a></li>
                                                <li><a href="shop-compare.html" class="popup-ajax"><i class="icon-shuffle"></i></a></li>
                                                <li><a href="shop-quick-view.html" class="popup-ajax"><i class="icon-magnifier-add"></i></a></li>
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
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.</p>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>`
    }
    document.querySelector('.search-home').innerHTML = result;
}
searchSelectorProduct.addEventListener('click', handleSearchClick);
inputSelectorProduct.addEventListener('keyup', handleSearchClick)