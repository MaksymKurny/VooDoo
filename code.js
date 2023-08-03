// Функція для переключення стану випадаючого списку
function toggleDropdown() {
    var dropdownContent = document.getElementById("myDropdown");
    dropdownContent.classList.toggle("show");
}

// // Закриваємо випадаючий список при кліку за межами нього
// window.onclick = function(event) {
//     if (event.target.id != 'dropbtn') {
//         var dropdowns = document.getElementsByClassName("dropdown-content");
//         for (var i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')) {
//                 openDropdown.classList.remove('show');
//             }
//         }
//     }
// }

let pagin = document.getElementsByClassName("pagination-btn");
let currPage = 1;


const paginationList = document.querySelector('.pagination');
paginationList.addEventListener('click', (e) => {
  if (e.target.textContent == '…') {
    return;
  }
  currPage = e.target.textContent;
  fetchProducts(currPage);
});

// Додавання карток на сторінку
const MakeCard = () => {
  return `
  <article class="product-card max-w-[300px]">
      <a class="product-photo rounded-4x1" href="#">
          <img class="product-image" src="" alt="product image"/>
          <span class="pre-owned-text rounded-smd bg-black">USED</span>
      </a>
      <div class="flex justify-between items-start self-stretch">
          <div style="text-align: left;">
              <p class="product-name textform-black">Product name</p>
              <p class="product-price textform-black font-bold">000 KR.</p>
          </div>
          <div style="text-align: right;">
              <p class="textform-black font-medium h-11">Condition</p>
              <p class="textform-black fw-small">Slightly used</p>
          </div>
      </div>
      <button type="button" class="product-add-btn textform-white">add to cart</button>
  </article>
  `;
};

const limit = 12;
for (let i = 0; i < limit; i++) {
  let card = MakeCard();
  document.querySelector('.grid-row').insertAdjacentHTML('afterbegin', card);
}
const products_card = document.querySelectorAll('.product-card');

// Додавання інформації до картки
const AddInfoCard = (product, info) => {
  product.setAttribute('data-id', info.id);
  product.querySelector('.product-name').textContent = `${info.title}`;

  product.querySelector('.product-image').setAttribute('src', ``);
  product.querySelector('.product-price').textContent = `000 KR.`;
  if(info.images[0]){
      product.querySelector('.product-image').setAttribute('src', `${info.images[0].src}`);
  }
  if(info.variants[0]){
      product.querySelector('.product-price').textContent = `${info.variants[0].price} KR.`;
  }
}

const fetchProducts = async (page = 1) => {
  try {
    const response = await fetch(`https://voodoo-sandbox.myshopify.com/products.json?limit=12&page=${page}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const products = data.products;

    for (let i = 0; i < 12; i++) {
        AddInfoCard(products_card[i], products[i]);
    }

    // Перевірте наявність інших сторінок і завантажте, якщо вони є
    if (data.hasOwnProperty('next_page_info')) {
      const nextPage = data.next_page_info;
      await fetchProducts(nextPage);
    }
  } catch (error) {
    console.error('Error fetching products:', error.message);
  }
};

fetchProducts();