let library = [];

let book_form = document.querySelector("form");
book_form.style.visibility = "hidden";
const addNewBtn = document.getElementsByTagName("button")[0];
addNewBtn.addEventListener('click',showTextFields);

function Book(title, genre, year, author) {
    this.title = title;
    this.genre = genre;
    this.year = year;
    this.isRead = false;
    this.author = author;
    this.isRead = false;
}

Book.prototype.changeStatus = function() {
    if(this.isRead === false){
        this.isRead = true;
    } else {
        this.isRead = false;
    }
}

function addToLibrary(form) {
    // adds book to library
    library.push(new Book(form.title.value, form.genre.value, form.year.value, form.author.value));
    hideTextFields(form);
}

function removeBookFromLibrary() {
    // removes book from library
}

function displayLibrary(library) {
    // loops thru library and displays the books
    library.forEach(element => {
        
    });
}

function showTextFields() {
    // shows new form for adding books
    form = document.querySelector("form");
    form.style.visibility = "visible";
}

function hideTextFields(form) {
    // clears and hides the form for adding books
    form.reset();
    form.style.visibility = "hidden";

}
