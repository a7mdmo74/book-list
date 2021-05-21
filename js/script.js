//Book Class : Represents the book

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class : Handle UI Tasks

class UI {
    static displayBooks() {
        const storedBooks = [
            {
                title: 'Book One',
                author: 'Mohamed',
                isbn: '10'
            },
            {
                title: 'Book Two',
                author: 'Saad',
                isbn: '1'
            },
            {
                title: 'Book Three',
                author: 'Ahmed',
                isbn: '74'
            }
        ];
        const books = storedBooks;
        books.forEach((book) => UI.addBooksToList(book));
    }
    static addBooksToList(book) {

        const list = document.querySelector('#book-list');

        const row  = document.createElement('tr')

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFeild() {
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert text-center alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 2500)
    }
}

//Event : display Book

document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event : Add a Book

document.querySelector('#book-form').addEventListener('submit', (e) => {
    //preventActualSubmit
    e.preventDefault()

    // Access form value
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill all input!', 'danger')
    }
    else {
        // Instatiate book
        const book = new Book(title, author, isbn);

        // Add Book to UI
        UI.addBooksToList(book);

        UI.showAlert('Book Added', 'success')

        // Clear feild
        UI.clearFeild();
    }
    
});

//Event : Remove a Book

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    UI.showAlert('Book Removed', 'warning')
})