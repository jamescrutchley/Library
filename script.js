const collection = [
    {title: 'Don Quixote', author: 'Miguel de Cervantes'},
    {title: 'War of the Worlds', author: 'H.G Wells'},
    {title: "Cat's Cradle", author: 'Kurt Vonnegut'},
    {title: "Figuring", author: 'Maria Papova'},
];

const bookshelf = document.querySelector('.bookshelf');


function Book(title, author, read, pageCount='unknown') {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
}

collection.push( new Book('Contact', 'Carl Sagan', true, 400));

Book.prototype.toggleRead = function() {
    this.read = this.read ? false : true;
    return this.read;
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
        if (book.read) {
            bookDiv.classList.add('read');
            isRead.textContent = 'Read';
        } else {
            isRead.textContent = 'Unread';
        }
        isRead.classList.add('read-button')
        bookDiv.appendChild(isRead);

        bookDiv.appendChild(bookTitle);
        bookDiv.classList.add('book-card')
        bookshelf.appendChild(bookDiv);
    }) 

    const books = document.querySelectorAll('#book')
    books.forEach((book, i) => book.setAttribute('data-index', i))
}


const handleBookEvents = (e) => {
    try {
        let index = e.target.parentElement.dataset.index;
        switch (collection[index].toggleRead()) {
            case true:
                e.target.textContent = 'Read';
                e.target.parentElement.classList.add('read')
                break;
            case false:
                e.target.textContent = 'Unread'
                e.target.parentElement.classList.remove('read')
                break;
            default:
                //
                break;
        }
    } catch {
        console.log('invalid')
    }
   
}

bookshelf.addEventListener('click', handleBookEvents)

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
            new Book(title.value,author.value, read.checked, pageCount.value)
            );
    }

    title.value = '';
    author.value = '';
    read.value = '';
    pageCount.value = '';

    closeForm();

    displayCollection();
}

submitBookButton.addEventListener('click', function(event) {
    event.preventDefault();
    submitBook();
});
addBookButton.addEventListener('click', openForm);
closeFormButton.addEventListener('click', closeForm);

