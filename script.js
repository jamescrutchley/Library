let collection = [];
const bookshelf = document.querySelector(".bookshelf");


function Book(title, author, read, pageCount = "unknown") {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read;
};

collection.push(new Book("I Am a Strange Loop", "Douglas Hofstadter", true, 412));
collection.push(new Book("Figuring", "Maria Papova", false, 578));


Book.prototype.toggleRead = function () {
  this.read = this.read ? false : true;
  return this.read;
};


// Render collection
function displayCollection() {

  while (bookshelf.firstChild) {
    bookshelf.removeChild(bookshelf.firstChild);
  }

  collection.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.id = "book";

    const bookTitle = document.createElement("p");
    bookTitle.textContent = book.title;
    bookDiv.appendChild(bookTitle);

    const authorText = document.createElement("p");
    authorText.textContent = book.author;
    bookDiv.appendChild(authorText);

    const pageCountText = document.createElement("p");
    pageCountText.textContent = `Pages: ${book.pageCount}`;
    bookDiv.appendChild(pageCountText);

    const isRead = document.createElement("button");
    isRead.textContent = book.read ? "Read" : "Unread";
    isRead.classList.add("read-button");
    bookDiv.appendChild(isRead);

    const removeBook = document.createElement("button");
    removeBook.classList.add("remove-book-button");
    removeBook.textContent = "Remove Book";
    bookDiv.appendChild(removeBook);

    bookDiv.classList.add("book-card");
    bookDiv.classList.add(isRead.textContent == "Read" ? "read" : null);
    bookshelf.appendChild(bookDiv);

    const books = document.querySelectorAll("#book");
    books.forEach((book, i) => book.setAttribute("data-index", i));
  });
}

const removeBook = (index) => {
  collection = collection.filter((item) => item !== collection[index]);
  displayCollection();

  // let element = Array.from(bookshelf.childNodes)[index];
  // bookshelf.removeChild(element);
};

const handleBookEvents = (e) => {
  let target = e.target;
  let index = target.parentElement.dataset.index
    ? target.parentElement.dataset.index
    : null;

  console.log(
    target,
    index,
    target.classList,
    target.classList == "read-button"
  );

  if (index === null) {
    return;
  }

  switch (target.classList.value) {
    case "read-button":
      switch (collection[index].toggleRead()) {
        case true:
          e.target.textContent = "Read";
          e.target.parentElement.classList.add("read");
          break;
        case false:
          e.target.textContent = "Unread";
          e.target.parentElement.classList.remove("read");
          break;
        default:
          //
          break;
      }
      break;
    case "remove-book-button":
      console.log("remove book button");
      removeBook(index);
      break;
    default:
      console.log("??");
      break;
  }
};

bookshelf.addEventListener("click", handleBookEvents);

displayCollection();

// Add book button and form logic

const form = document.querySelector(".add-book-form");
const addBookButton = document.querySelector(".add-book-button");
const submitBookButton = document.querySelector(".submit-book");
const closeFormButton = document.querySelector(".close-form-button");

// switch to toggle?

function openForm() {
  form.style.display = "block";

  let title = document.querySelector("#title");
  title.focus();
}

function closeForm() {
  form.style.display = "none";
}

const submitBook = (title, author, read, pageCount) => {
  let inputElements = document.querySelectorAll('input');

  collection.push(
    new Book(title, author, read, pageCount)
  );

  inputElements.forEach(element => element.value = '');

  closeForm();
  displayCollection();
};

// let title = document.querySelector("#title");
// let author = document.querySelector("#author");
// let read = document.querySelector("#read");
// let pageCount = document.querySelector("#pages");
// const requiredInputElements = [title, author, pageCount];

let requiredFields = [
  { fieldName: "title", errorMessage: "Title is required." },
  { fieldName: "author", errorMessage: "Author is required." },
  { fieldName: "pages", errorMessage: "Page count is required.",
    patternErrorMessage: "Invalid page number." },
];

let counter = 0;

submitBookButton.addEventListener("click", function (event) {
  validateForm(event);
});



// patternMismatch not working
const validateForm = (event) => {
  counter = 0;
  requiredFields.forEach((field) => {
    let inputField = document.getElementById(field.fieldName);
    let errorField = document.querySelector(`#${field.fieldName} + span`);
    if (inputField.validity.valueMissing) {
      errorField.textContent = field.errorMessage;
      event.preventDefault();
    } else if (inputField.validity.patternMismatch) {
        console.log('checking')
        errorField.textContent = field.patternErrorMessage;
    } else {
      counter += 1;
      errorField.textContent = "";
      event.preventDefault();
      console.log(counter);
    }
    if (
      event.target.nodeName === "BUTTON" &&
      requiredFields.length === counter
    ) {
        let title = document.querySelector("#title");
        let author = document.querySelector("#author");
        let read = document.querySelector("#read");
        let pageCount = document.querySelector("#pages");
      console.log("form is valid. book submitted.");
      event.preventDefault();
      submitBook(title.value, author.value, read.value, pageCount.value);
    }
  });
};

// requiredInputElements.forEach((element) => {
//   element.addEventListener("input", function (event) {
//     validateForm(event);
//   });
// });

addBookButton.addEventListener("click", openForm);
closeFormButton.addEventListener("click", closeForm);



// Add a few books: 

