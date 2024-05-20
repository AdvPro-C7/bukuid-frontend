let home = `
<header>
    <div class="logo">Buku.ID</div>
    <button id="logout-btn">Logout</button>
</header>
<main>
    
<div class="book-list">
${Array(10)
  .fill()
  .map(
    (_, i) => `
  <div class="book-item">
    <div class="book-cover"></div>
    <div class="book-info">
      <h2 class="book-title">Book Title ${i + 1}</h2>
      <p class="book-author">Author: Author ${i + 1}</p>
      <p class="book-publisher">Publisher: Publisher ${i + 1}</p>
      <p class="book-published-date">Published Date: 202${i}-01-01</p>
      <p class="book-description">Description: This is a description of Book ${
        i + 1
      }.</p>
      <p class="book-price">Price: $${(i + 1) * 10}.00</p>
      <p class="book-stock">Stock: ${100 - i * 10}</p>
      <p class="book-isbn">ISBN: 978-3-16-148410-${i}</p>
      <p class="book-category">Category: Category ${i + 1}</p>
    </div>
  </div>
`
  )
  .join("")}
</div>

</main>
`;

export { home };
