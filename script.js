let collection = [];

const bookshelf = document.querySelector(".bookshelf");

class Book {
  constructor(title, author, read, pageCount = "unknown") {
    Object.assign(this, { title, author, read, pageCount });
  }
  toggleRead = () => {
    this.read = this.read ? false : true;
    return this.read;
  };
}

collection.push(new Book("Contact", "Carl Sagan", true, 432));
collection.push(new Book("Figuring", "Maria Papova", false, 578));

function displayCollection() {
  Array.from(bookshelf.childNodes).forEach((child) => {
    bookshelf.removeChild(child);
  });

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

// better to remove from collection array then refresh elements,
// or remove from elements and update collection array?

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

const submitBook = () => {
  let title = document.querySelector("#title");
  let author = document.querySelector("#author");
  let read = document.querySelector("#read");
  let pageCount = document.querySelector("#pages");

  if (title.value && author.value) {
    collection.push(
      new Book(title.value, author.value, read.checked, pageCount.value)
    );
  }

  title.value = "";
  author.value = "";
  read.value = "";
  pageCount.value = "";

  closeForm();

  displayCollection();
};

submitBookButton.addEventListener("click", function (event) {
  event.preventDefault();
  submitBook();
});
addBookButton.addEventListener("click", openForm);
closeFormButton.addEventListener("click", closeForm);
