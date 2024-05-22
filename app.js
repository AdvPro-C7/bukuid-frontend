document.addEventListener('DOMContentLoaded', () => {
    navigate('customers');
});

const routes = {
    'customers': 'customers.html',
    'books': 'books.html'
};

function navigate(route) {
    const routePath = routes[route];
    if (routePath) {
        fetch(routePath)
            .then(response => response.text())
            .then(html => {
                document.getElementById('content').innerHTML = html;
                if (route === 'customers') {
                    loadCustomers();
                } else if (route === 'books') {
                    loadBooks();
                }
            })
            .catch(error => console.error('Error loading page:', error));
    }
}

function loadCustomers() {
    fetch('/api/customer/')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('customers-tbody');
            tbody.innerHTML = data.map(customer => `
                <tr>
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.warnings}</td>
                </tr>
            `).join('');

            data.forEach(customer => {
                if (customer.warnings === 2) {
                    alert('Anda sudah mendapatkan 2 peringatan, sekali lagi Anda mendapatkan peringatan maka akun Anda akan diblokir');
                } else if (customer.warnings >= 3) {
                    alert(`Akun pelanggan dengan nama ${customer.name} telah diblokir.`);
                }
            });
        })
        .catch(error => console.error('Error fetching customer data:', error));
}

function loadBooks() {
    fetch('/api/buku/')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('books-tbody');
            tbody.innerHTML = data.map(book => `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.author}</td>
                    <td>${book.publisher}</td>
                    <td>${book.price}</td>
                </tr>
            `).join('');
        })
        .catch(error => console.error('Error fetching book data:', error));
}
