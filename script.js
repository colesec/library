let books = [];

class Book{
  constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }
}

function addBookToLibrary(title, author, pages, read){
  newBook = new Book(title, author, pages, read);
  books.push(newBook);

  updateCards();
}

function getBookIndex(e){
  let id = Array.from(e.target.closest(".card").children)[4].textContent;
  for(let i=0; i<books.length; i++){
    if (books[i].id == id){
      return i
    }
  }
}

function removeBook(e){
  let index = getBookIndex(e);
  books.splice(index, 1);
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

    let readDiv = document.createElement("div");
    readDiv.classList.add("read");
    let readSpan=document.createElement("span");
    readDiv.appendChild(readSpan);
    (book.read)
    ? readSpan.textContent = "Read"
    : readSpan.textContent = "Unread";

    readSpan.addEventListener("click", (e) => {
      let index = getBookIndex(e);
      console.log(index);
      (books[index].read)
      ? books[index].read = false
      : books[index].read = true;
      updateCards();
    });

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
    cardDiv.appendChild(readDiv);
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
let newBookRead = document.querySelector("#readInput");

let addBookBtn = document.querySelector("#addBookBtn");

let errorDiv = document.querySelector(".error");

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if(Boolean(newBookTitle.value) && Boolean(newBookAuthor.value) && Boolean(newBookPages.value)){
    addBookToLibrary(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookRead.checked)
    errorDiv.classList.add("hide");
  }
  else{
    errorDiv.classList.remove("hide");
  };
});