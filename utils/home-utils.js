function init() {
  document.getElementById("logout-btn").addEventListener("click", function () {
    // clear all cookies
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    // Redirect to '/auth'
    window.location.href = "/auth";
  });

  fetch("http://localhost:8080/api/best-selling-books")
    .then((response) => response.json())
    .then((books) => {
      const bookListContainer = document.querySelector(".book-list");

      books.slice(0, 10).forEach((book, i) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");

        bookItem.innerHTML = `
          <div class="book-cover"></div>
          <div class="book-info">
            <h2 class="book-title">${book.title}</h2>
            <p class="book-author">${book.author}</p>
            <p class="book-publisher">${book.publisher}</p>
            <p class="book-published-date">${book.publishDate}</p>
            <p class="book-description">${book.description}</p>
            <p class="book-price">${book.price}</p>
            <p class="book-stock">Stock: ${book.stock}</p>
            <p class="book-isbn">${book.isbn}</p>
            <p class="book-category">${book.category}</p>
          </div>
        `;

        bookListContainer.appendChild(bookItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching book data:", error);
    });
}

export { init };
