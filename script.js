const collection = [
    {title: 'Don Quixote', author: 'Miguel de Cervantes'},
    {title: 'War of the Worlds', author: 'H.G Wells'},
    {title: "Cat's Cradle", author: 'Kurt Vonnegut'},
    {title: "Figuring", author: 'Maria Papova'},
];

function Book() {

}

function addBookToCollection() {

}

function displayCollection() {
    collection.forEach(book => {
        const bookDiv = document.createElement("div")
        const bookTitle = document.createTextNode(book.title);
        bookDiv.appendChild(bookTitle);
        bookDiv.classList.add('book-card')
        document.body.appendChild(bookDiv);
    }) 
}

displayCollection();