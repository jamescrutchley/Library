const collection = [
    {title: 'Don Quixote', author: 'Miguel de Cervantes'},
    {title: 'War of the Worlds', author: 'H.G Wells'},
    {title: "Cat's Cradle", author: 'Kurt Vonnegut'},
    {title: "Figuring", author: 'Maria Papova'},
];

const bookshelf = document.querySelector('.bookshelf');

function Book(title, author, read=false, pageCount='unknown') {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
}

collection.push( new Book('Contact', 'Carl Sagan', true, 400));

Book.prototype.toggleRead = function() {
    console.log(this);
    
} 


function displayCollection() {
    Array.from(bookshelf.childNodes).forEach(child => {
        bookshelf.removeChild(child)
    });

    collection.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.id = 'book';
        const bookTitle = document.createTextNode(book.title);
        const isRead = document.createElement('p');
        isRead.textContent = book.read ? 'Read' : 'Unread';
        bookDiv.appendChild(isRead);
        bookDiv.appendChild(bookTitle);
        bookDiv.classList.add('book-card')
        bookshelf.appendChild(bookDiv);
    }) 

    const books = document.querySelectorAll('#book')
    books.forEach((book, i) => book.setAttribute('data-index', i))
}

displayCollection();


// Add book button and form logic 


const form = document.querySelector(".add-book-form");
const addBookButton = document.querySelector(".add-book-button");
const submitBookButton = document.querySelector(".submit-book");
const closeFormButton = document.querySelector(".close-form-button");


// switch to toggle?

function openForm() {
    form.style.display = "block";

    let title = document.querySelector('#title')
    title.focus();
  }

function closeForm() {
    form.style.display = "none";
}

const submitBook = () => {

    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let read = document.querySelector('#read');
    let pageCount = document.querySelector('#pages');

    if ((title.value && author.value)) {
        collection.push(
            new Book(title.value,author.value, read.value, pageCount.value)
            );
    }

    title.value = '';
    author.value = '';

    closeForm();

    displayCollection();
}

submitBookButton.addEventListener('click', function(event) {
    event.preventDefault();
    submitBook();
});
addBookButton.addEventListener('click', openForm);
closeFormButton.addEventListener('click', closeForm);

