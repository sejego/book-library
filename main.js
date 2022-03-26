/* Library class to hold Book objects, remove them and render them in DOM */

function Library() {
    this.books = [];
    this.shelf = document.getElementsByClassName("library")[0];
}

Library.prototype.push = function(book) {
    this.books.push(book);
    if(canStore) {
        localStorage.setItem("books", JSON.stringify(this.books));
    }
    this.renderBooks();
}

/* Remove a book and update the DOM */

Library.prototype.removeBook = function(book) {
    let bookIdx = 0;
    for(bookIdx = 0; bookIdx < this.books.length; bookIdx++) {
        if(this.books[bookIdx] == book) {
            this.books.splice(bookIdx, 1);
            break;
        }
    }
    if(canStore) {
        localStorage.setItem("books", JSON.stringify(this.books));
    }
    this.renderBooks();
}

/* Remove the existing books and render an updated list of books */

Library.prototype.renderBooks = function() {

    // Remove rows while there are rows in the body
    // of the table (only main ones)

    while(this.shelf.rows.length != 1) {
        this.shelf.deleteRow(1);
    }

    for(let i = 0; i < this.books.length; i++){
        this.renderABook(this.books[i], i);
    }
}

/* Render one book by adding it as a row in a table of books */

Library.prototype.renderABook = function(book, idx) {

    let statusText = "Not finished";

    // add fixed number of current cells and assign a book ID to cell.

    let row = this.shelf.insertRow(-1);
    row.id = idx;

    for(let i = 0; i < 7; i++) {
        row.insertCell();
    }

    const removeBtn = this.createRemoveBtn();
    removeBtn.addEventListener('click', () => {
        this.removeBook(book);
    })

    const changeBtn = this.createChangeBtn();
    changeBtn.addEventListener('click', () => {
        book.changeStatus();
        this.renderBooks();
    })

    if(book.isRead){
        statusText = "Finished"
    }

    row.cells[0].innerHTML = book.title;
    row.cells[1].innerHTML = book.author;
    row.cells[2].innerHTML = book.genre;
    row.cells[3].innerHTML = book.year;
    row.cells[4].innerHTML = statusText;
    row.cells[5].appendChild(changeBtn);
    row.cells[6].appendChild(removeBtn);
}

/* Two methods for creating change and remove buttons next to every book. */

Library.prototype.createRemoveBtn = function() {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    return removeBtn;
}

Library.prototype.createChangeBtn = function() {
    const changeBtn = document.createElement('button');
    changeBtn.textContent = 'Change Status';
    return changeBtn;
}

/* Book class holding all the information about books. */

function Book(title = "Untitled", genre = "Unknown", year = "Unknown", author = "Unknown") {
    this.title = title;
    this.genre = genre;
    this.year = year;
    this.isRead = false;
    this.author = author;
}

Book.prototype.changeStatus = function() {
    this.isRead = !this.isRead;
}

/* Global function that is executed by pressing the Add button.
Creates a book, pushed it into the Library and hides the form */

function submitNewBook(form) {

    let book = new Book();
    book.title = form.title.value;
    book.author = form.author.value;
    book.year = form.year.value;
    book.genre = form.genre.value;
    book.isRead = form.checkbox.checked;
    bookLibrary.push(book);
    hideFormFields();
}

function showFormFields() {
    // shows new form for adding books
    form = document.querySelector("form");
    form.style.visibility = "visible";
}

function hideFormFields(form) {
    // clears and hides the form for adding books
    form = document.querySelector("form");
    form.reset();
    form.style.visibility = "hidden";
}

/* Taken from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API */
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

let bookLibrary = new Library(); 
let canStore = false;


/* If local storage is available, it will set global variable canStore to allow saving books to local storage
and add all existing books in the storage to Library. every parsed object must be assigned a Book prototype 
to enable assigned methods */
if(storageAvailable('localStorage')) {
    canStore = true;
    let books = JSON.parse(localStorage.getItem("books") || "[]");
    for(let i = 0; i < books.length; i++) {
        bookLibrary.push(Object.assign(new Book, books[i]));
    }
}

let bookForm = document.querySelector("form");
bookForm.style.visibility = "hidden";