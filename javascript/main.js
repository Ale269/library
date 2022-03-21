const newBookBtn = document.getElementById("create-button");
const nameInput = document.getElementById("book-name");
const authorInput = document.getElementById("book-author");
const pagesInput = document.getElementById("pages");
let library = [];

function Book() {
    this.name = nameInput.value;
    this.author = authorInput.value;
    this.pages = pagesInput.value;
}

localStorage.clear();


// get book list from local storage
function getBook() {
    for(let i = 0; i < localStorage.length; i++ ){
        const bookString = localStorage.getItem(`book${i}`);
        const book = JSON.parse(bookString);
        library.push(book);
    }
}

function displayLibrary() {
    getBook();
    console.log(library);
}

function setNewBook() {
    const newKey = "book" + (localStorage.length);
    const newBook = new Book;
    newBook.key = newKey;
    const newBookString = JSON.stringify(newBook);
    localStorage.setItem(newKey, newBookString);
    console.log(localStorage);

    displayLibrary();
}


newBookBtn.addEventListener("click", setNewBook);
displayLibrary();

