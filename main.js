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
    while(this.shelf.firstChild) {
        this.shelf.removeChild(this.shelf.firstChild);
    }

    for(let i = 0; i < this.books.length; i++){
        this.renderABook(this.books[i], i);
    }
}

Library.prototype.renderABook = function(book, idx) {

    let listItem = document.createElement("li");
    let statusText = "Not finished";

    listItem.id = idx;
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
    listItem.innerHTML = book.author + " " + book.title + " " + book.year + " " + book.genre + " " + statusText;
    listItem.append(removeBtn);
    listItem.append(changeBtn);
    this.shelf.appendChild(listItem);
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

function Book(title, genre, year, author) {
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
    if(isEmpty(form.title.value)){
        book.title = "Unknown";
    }
    if(isEmpty(form.genre.value)){
        book.genre = "Unknown";
    }
    if(isEmpty(form.year.value)){
        book.year = "Unknown";
    }
    if(isEmpty(form.author.value)){
        book.author = "Unknown";
    }
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
