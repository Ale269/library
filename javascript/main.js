const newBookBtn = document.getElementById("create-button");
const nameInput = document.getElementById("book-name");
const authorInput = document.getElementById("book-author");
const pagesInput = document.getElementById("pages");
const readItInput = document.getElementById("checkbox");
let library = [];

function Book() {
    this.name = nameInput.value;
    this.author = authorInput.value;
    this.pages = pagesInput.value;
    this.readIt = readItInput.checked;
}


// get book list from local storage
function getBook() {
    library=[];

    for(let i = 0; i < localStorage.length; i++ ){
        const bookString = localStorage.getItem(localStorage.key(i));
        const book = JSON.parse(bookString);
        library.push(book);
    }
}

function displayLibrary() {
    document.querySelector(".library-container").innerHTML = "";

    getBook();

    for(let i=0; i<library.length; i++){
        const card = document.createElement("div");
        const title = document.createElement("h3");
        const author = document.createElement("h4");
        const pages = document.createElement("h4");
        const readBtn = document.createElement("button");
        const removeBtn = document.createElement("button");

        removeBtn.setAttribute("data-position", i);
        removeBtn.addEventListener("click", removeBook);
        readBtn.setAttribute("data-position", i);
        readBtn.addEventListener("click", toggleRead);

        card.setAttribute("class", "card-container");

        title.textContent = library[i].name;       
        author.textContent = library[i].author;
        pages.textContent = library[i].pages;
        removeBtn.textContent = "Remove";
        readBtn.textContent = library[i].readIt ? "Read" : "Not Read";

        if(library[i].readIt){
            readBtn.classList.add("active");
        }else {
            readBtn.classList.add("inactive");
        }

        document.querySelector(".library-container").append(card);
        card.append(title);
        title.after(author);
        author.after(pages);
        pages.after(readBtn);
        readBtn.after(removeBtn);
    }
}

function setNewBook() {
    const newBook = new Book;

    if(newBook.name && newBook.pages && newBook.author){
        library.push(newBook);

        localStorage.clear();
        saveData();
        displayLibrary();
    }
}

function removeBook(event) {
    library.splice(event.target.dataset.position, 1);

    localStorage.clear();
    saveData();
    displayLibrary();
}

function saveData() {
    for(let i=0; i<library.length; i++){
        const newBookString = JSON.stringify(library[i]);
        localStorage.setItem(i, newBookString);
    }
}

function toggleRead(event) {
    library[event.target.dataset.position].readIt = !library[event.target.dataset.position].readIt;

    localStorage.clear();
    saveData();
    displayLibrary();
}


newBookBtn.addEventListener("click", setNewBook);
displayLibrary();


