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
    listItem.id = idx;
    const removeBtn = this.createRemoveBtn();
    removeBtn.addEventListener('click', () => {
        this.removeBook(book);
    })
    listItem.innerHTML = book.author + " " + book.title + " " + book.year + " " + book.genre + " ";
    listItem.append(removeBtn);
    this.shelf.appendChild(listItem);
}

Library.prototype.createRemoveBtn = function() {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
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
    showTextFields();
    bookLibrary.push(new Book(form.title.value, form.genre.value, form.year.value, form.author.value));
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
