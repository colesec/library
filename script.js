let books = [];

function Book(title, author, pages){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages){
  newBook = new Book(title, author, pages);
  books.push(newBook);

  updateCards();
}

function removeBook(e){
  let id = Array.from(e.target.parentElement.children)[3].textContent;
  for(let i=0; i<books.length; i++){
    if (books[i].id == id){
      books.splice(i, 1);
      break;
    }
  }
  updateCards();
}

function updateCards(){
  bookContainerDiv.replaceChildren();
  for (let book of books){
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = book.title;

    let authorDiv = document.createElement("div");
    authorDiv.classList.add("author");
    authorDiv.textContent = book.author;

    let pagesDiv = document.createElement("div");
    pagesDiv.classList.add("pages");
    pagesDiv.textContent = `Pages: ${book.pages}`;

    let idDiv = document.createElement("div");
    idDiv.classList.add("id");
    idDiv.textContent = book.id;

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", (e) => removeBook(e));

    bookContainerDiv.appendChild(cardDiv);
    cardDiv.appendChild(titleDiv);
    cardDiv.appendChild(authorDiv);
    cardDiv.appendChild(pagesDiv);
    cardDiv.appendChild(idDiv);
    cardDiv.appendChild(deleteButton);
  }
  if (books.length==0){
    bookContainerDiv.textContent = "Currently empty :(";
  }
}

let bookContainerDiv = document.querySelector(".bookContainer");

let newBookTitle = document.querySelector("#titleInput");
let newBookAuthor = document.querySelector("#authorInput");
let newBookPages = document.querySelector("#pagesInput");

let addBookBtn = document.querySelector("#addBookBtn");

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary(newBookTitle.value, newBookAuthor.value, newBookPages.value);
});