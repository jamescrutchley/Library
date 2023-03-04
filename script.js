const collection = [
    {title: 'Don Quixote', author: 'Miguel de Cervantes'},
    {title: 'War of the Worlds', author: 'H.G Wells'},
    {title: "Cat's Cradle", author: 'Kurt Vonnegut'},
    {title: "Figuring", author: 'Maria Papova'},
];

const bookshelf = document.querySelector('.bookshelf');

function Book() {

}


function displayCollection() {
    Array.from(bookshelf.childNodes).forEach(child => {
        bookshelf.removeChild(child)
    });

    collection.forEach(book => {
        const bookDiv = document.createElement("div")
        const bookTitle = document.createTextNode(book.title);
        bookDiv.appendChild(bookTitle);
        bookDiv.classList.add('book-card')
        bookshelf.appendChild(bookDiv);
    }) 
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

    if ((title.value && author.value)) {
        collection.push(
            {title: title.value,
             author: author.value,});
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


// enter key form submission

let inputs = document.querySelectorAll('.book-input');

// inputs.forEach(input => input.addEventListener('keydown', (e) => {
//     switch (e.key) 
//         {
//         case 'Enter':
//         submitBook();
//         }
// }));