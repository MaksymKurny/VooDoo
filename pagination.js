const element = document.querySelector(".pagination");
let totalPages = 25;
let page = 1;

element.innerHTML = createPagination(totalPages, page);
function createPagination(totalPages, page){
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;

  if(page > 2){ //якщо значення сторінки менше 2, тоді додайте 1 після попередньої кнопки
    liTag += `<li><a class="pagination-btn" onclick="createPagination(totalPages, 1)">1</a></li>`;
    if(page > 3){ //якщо значення сторінки більше 3, додаємо (...) після першої лі або сторінки
      liTag += `<li><a class="pagination-btn dots">…</a></li>`;
    }
  }

  // кількість кнопок якщо в кінці
  if (page == totalPages) {
    beforePage = beforePage - 3;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 2) {
    beforePage = beforePage - 1;
  }
  // кількість кнопок якщо на початку
  if (page == 1) {
    afterPage = afterPage + 3;
  } else if (page == 2) {
    afterPage  = afterPage + 2;
  } else if (page == 3) {
    afterPage  = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) { //якщо довжина більша за загальну довжину сторінки, пропустити
      continue;
    }
    if (plength == 0) {
      plength = plength + 1;
    }
    active = page == plength?"active":"";
    liTag += `<li><a class="pagination-btn ${active}" href="#${plength}" onclick="createPagination(totalPages, ${plength})">${plength}</a></li>`;
  }

  if(page < totalPages - 1){ //якщо значення сторінки менше значення totalPage на -1, тоді показується остання li або сторінка
    if(page < totalPages - 2){
      liTag += `<li><a class="pagination-btn dots">…</a></li>`;
    }
    liTag += `<li><a class="pagination-btn" href="#${totalPages}" onclick="createPagination(totalPages, ${totalPages})">${totalPages}</a></li>`;
  }
  element.innerHTML = liTag;
  return liTag;
}