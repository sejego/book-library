bookLibrary = new Library();

let bookForm = document.querySelector("form");
bookForm.style.visibility = "hidden";
const addNewBtn = document.getElementsByTagName("button")[0];
addNewBtn.addEventListener('click',showTextFields);


function Library() {
    this.idx = 0;
    this.books = [];
    this.shelf = document.getElementsByClassName("library")[0];
}

Library.prototype.push = function(book) {
    this.books.push(book);
    this.renderBooks();
    hideTextFields();
}

Library.prototype.removeBook = function(book) {
    let bookIdx = 0;
    for(bookIdx = 0; bookIdx < this.books.length; bookIdx++) {
        if(this.books[bookIdx] == book) {
            this.books.splice(bookIdx, 1);
            break;
        }
    }
    this.renderBooks();
}

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

Library.prototype.renderABook = function(book, idx) {

    let statusText = "Not finished";

    // add fixed number of current cells and assign a book ID to cell.

    let row = this.shelf.insertRow(-1);
    row.id = idx;

    for(let i = 0; i < 6; i++) {
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
    row.cells[4].appendChild(changeBtn);
    row.cells[5].appendChild(removeBtn);
}

Library.prototype.createRemoveBtn = function() {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    return removeBtn;
}

Library.prototype.createChangeBtn = function() {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Change';
    return removeBtn;
}

function Book(title = "Untitled", genre = "Unknown", year = "Unknown", author = "Unknown") {
    this.title = title;
    this.genre = genre;
    this.year = year;
    this.isRead = false;
    this.author = author;
    this.isRead = false;
}

Book.prototype.changeStatus = function() {
    this.isRead = !this.isRead;
}


function submitNewBook(form) {
    let book = new Book();
    showTextFields();
    /*
    console.log(form)
    if(isEmpty(form.title.value)){
        book.title = "Untitled";
    }
    if(isEmpty(form.genre.value)){
        book.genre = "Unknown";
    }
    if(isEmpty(form.year.value)){
        book.year = "Unknown";
    }
    if(isEmpty(form.author.value)){
        book.author = "Unknown";
    }*/
    book.title = form.title.value;
    book.author = form.author.value;
    book.year = form.year.value;
    book.genre = form.genre.value;
    bookLibrary.push(book);
}

function showTextFields() {
    // shows new form for adding books
    form = document.querySelector("form");
    form.style.visibility = "visible";
}

function hideTextFields(form) {
    // clears and hides the form for adding books
    form = document.querySelector("form");
    form.style.visibility = "hidden";

}

function isEmpty(str) {
    return !str.trim().length;
}
