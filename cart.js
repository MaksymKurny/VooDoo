const products = document.querySelectorAll('.product-card');
const productsBtn = document.querySelectorAll('.product-add-btn');
const cartProductsList = document.querySelector('.buylist');
const fullPrice = document.querySelector('.fullprice');
let price = 0;

const plusTotalPrice = (currentPrice) => {
	return price += currentPrice;
};

const minusTotalPrice = (currentPrice) => {
	return price -= currentPrice;
};

const printTotalPrice = () => {
	fullPrice.textContent = `${price.toFixed(2)} KR.`;
};

const AddCartProduct = (id, img, name, price) => {
	return `
    <li class="cart-product-item">
        <article class="cart-product" data-id="${id}">
            <img class="cart-product-img" src="${img}" alt="img">
            <div class="cart-product-info">
                <p class="cart-product-name">${name}</p>
                <p class="cart-product-price" hidden>${price}</p>
                <p class="cart-product-price-count">${price} KR.</p>
                <div class="flex items-start textform-white">
                    <button class="cart-product-minus" type="button">-</button>
                    <button class="cart-product-count" style="cursor: default;">1</button>
                    <button class="cart-product-plus" type="button">+</button>
                </div>
            </div>
            <img class="cart-product-dell" src="swg/delete-bin.svg" alt="dell">
        </article>
    </li>
	`;
};

const deleteProducts = (productParent) => {
	let PriceCount = parseFloat(productParent.querySelector('.cart-product-price-count').textContent);

	minusTotalPrice(PriceCount);
    if(price<0) price=0;

	printTotalPrice();
	productParent.remove();
};

const plusProducts = (productParent) => {
	let PriceConst = parseFloat(productParent.querySelector('.cart-product-price').textContent);
    let count = parseInt(productParent.querySelector('.cart-product-count').textContent)+1;

    productParent.querySelector('.cart-product-price-count').textContent = `${(count*PriceConst).toFixed(2)} KR.`;
    productParent.querySelector('.cart-product-count').textContent = `${count}`;
	
    plusTotalPrice(PriceConst);
	printTotalPrice();
};

const minusProducts = (productParent) => {
	let PriceConst = parseFloat(productParent.querySelector('.cart-product-price').textContent);
    let count = parseInt(productParent.querySelector('.cart-product-count').textContent)-1;
    if (count == 0){ return;}

    productParent.querySelector('.cart-product-price-count').textContent = `${(count*PriceConst).toFixed(2)} KR.`;
    productParent.querySelector('.cart-product-count').textContent = `${count}`;
	
    minusTotalPrice(PriceConst);
	printTotalPrice();
};

productsBtn.forEach(el => {
	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.product-card');
		let id = parent.dataset.id;
		let img = parent.querySelector('.product-image').getAttribute('src');
		let name = parent.querySelector('.product-name').textContent;
		let price = parseFloat(parent.querySelector('.product-price').textContent);
		let productHTML = AddCartProduct(id, img, name, price);
		
		for (let i = 0; i < cartProductsList.children.length; i++) {
			if (cartProductsList.children[i].querySelector('.cart-product').dataset.id === id) {
				plusProducts(cartProductsList.children[i].querySelector('.cart-product'));
				return;
			}
		}

		plusTotalPrice(price);
		printTotalPrice();

		cartProductsList.insertAdjacentHTML('afterbegin', productHTML);
	});
});

cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('cart-product-dell')) {
		deleteProducts(e.target.closest('.cart-product-item'));
	}
    else if (e.target.classList.contains('cart-product-plus')) {
		plusProducts(e.target.closest('.cart-product-item'));
	}
    else if (e.target.classList.contains('cart-product-minus')) {
		minusProducts(e.target.closest('.cart-product-item'));
	}
});