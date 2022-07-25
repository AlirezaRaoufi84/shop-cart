let allProducts = [
    { id: 1, title: 'Album 1', price: 5, img: 'Images/Album 1.png', count: 1 },
    { id: 2, title: 'Album 2', price: 15, img: 'Images/Album 2.png', count: 1 },
    { id: 3, title: 'Album 3', price: 20, img: 'Images/Album 3.png', count: 1 },
    { id: 4, title: 'Album 4', price: 100, img: 'Images/Album 4.png', count: 1 },
    { id: 5, title: 'Coffee', price: 5, img: 'Images/Cofee.png', count: 1 },
    { id: 6, title: 'Shirt', price: 50, img: 'Images/Shirt.png', count: 1 },
]

let userBasket = []

let $ = document
const shopItemsContainer = $.querySelector('.shop-items')
const bastekProductsContainer = $.querySelector('.cart-items')
const removeAllProductsBtn = $.querySelector('#remove-all-products')
const cartTotalPriceElem = $.querySelector('.cart-total-price')
let test;

allProducts.forEach(function(product){
    
    let newProduct = $.createElement('div')
    newProduct.classList.add('shop-item')
    let newSpanPr = $.createElement('span')
    newSpanPr.classList.add('shop-item-title')
    newSpanPr.innerHTML = product.title
    let newImgSrc = $.createElement('img')
    newImgSrc.classList.add('shop-item-image')
    newImgSrc.src = product.img

    let newPrDetail = $.createElement('div')
    newPrDetail.classList.add('shop-item-details')
    let prDetail = $.createElement('span')
    prDetail.classList.add('shop-item-price')
    prDetail.innerHTML = product.price
    let addToCartBtn = $.createElement('button')
    addToCartBtn.classList.add('btn', 'btn-primary' , 'shop-item-button')
    addToCartBtn.type = 'button'
    addToCartBtn.innerHTML = 'ADD TO CART'

    newPrDetail.append(prDetail, addToCartBtn)
    newProduct.append(newSpanPr, newImgSrc, newPrDetail)
    // console.log(newProduct);
    shopItemsContainer.appendChild(newProduct)


    addToCartBtn.addEventListener('click', function(e){
        addProductToBasket(product.id)
    })
})


function addProductToBasket(productId){
let mainProduct = allProducts.find(function(product){
    return product.id === productId
})
    userBasket.push(mainProduct)
    basketProductsGenerator(userBasket)
    // console.log(userBasket);
    calcTotalPrice(userBasket)
}


function basketProductsGenerator (userBasketArray) {
    bastekProductsContainer.innerHTML = ''

    userBasketArray.forEach (function (product) {

        let basketProductContainer = $.createElement('div')
        basketProductContainer.classList.add('cart-row')

        let basketProductDetailsContainer = $.createElement('div')
        basketProductDetailsContainer.className = 'cart-item cart-column'

        let basketProductImg = $.createElement('img')
        basketProductImg.setAttribute('src', product.img)
        basketProductImg.setAttribute('width', "100")
        basketProductImg.setAttribute('height', "100")
        basketProductImg.classList.add('cart-item-image')

        let basketProductTitleSpan = $.createElement('span')
        basketProductTitleSpan.classList.add('cart-item-title')
        basketProductTitleSpan.innerHTML = product.title

        basketProductDetailsContainer.append(basketProductImg, basketProductTitleSpan)

        let basketProductPriceSpan = $.createElement('span')
        basketProductPriceSpan.className = 'cart-price cart-column'
        basketProductPriceSpan.innerHTML = product.price

        let basketProductInputsContainer = $.createElement('div')
        basketProductInputsContainer.className = 'cart-quantity cart-column'

        let basketProductInput = $.createElement('input')
        basketProductInput.className = 'cart-quantity-input'
        basketProductInput.value = product.count
        basketProductInput.setAttribute('type', 'number')
        basketProductInput.addEventListener('change', function () {
            updateProductCount(product.id, basketProductInput.value)
        })

        let basketProductRemoveBtn = $.createElement('button')
        basketProductRemoveBtn.className = 'btn btn-danger'
        basketProductRemoveBtn.innerHTML = 'Remove'
        basketProductRemoveBtn.addEventListener('click', function () {
            removeProductFromBasket(product.id)
        })

        basketProductInputsContainer.append(basketProductInput, basketProductRemoveBtn)

        basketProductContainer.append(basketProductDetailsContainer, basketProductPriceSpan, basketProductInputsContainer)

        bastekProductsContainer.append(basketProductContainer)

    })
}

function removeProductFromBasket(productId){
userBasket = userBasket.filter(function(product){
    return product.id !== productId
})
//    console.log(removebleItem);
   basketProductsGenerator(userBasket)
   calcTotalPrice(userBasket)
}

removeAllProductsBtn.addEventListener('click', function(){
    userBasket = []
    basketProductsGenerator(userBasket)
    cartTotalPriceElem.innerHTML = '$0'
})

function calcTotalPrice(userBasketArray){
    let sum = 0
    userBasketArray.forEach(function(product){
        sum += product.price * product.count
    })
    cartTotalPriceElem.innerHTML = '$' + sum
}

function updateProductCount(productId , newCount){
    userBasket.forEach(function(product){
        if(productId === product.id){
            product.count = newCount
        }
    })
    calcTotalPrice(userBasket)
}
