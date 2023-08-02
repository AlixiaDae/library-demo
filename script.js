// Classes
class Library {
    constructor() {
        this.books = []
    }

    getBooks() {
        return this.books
    }

    addBook(newBook) {
        if(this.books.find(book => book.name === newBook.name)) return

        this.books.push(newBook)
    }

    deleteBook(bookName) {
        this.books = this.books.filter(book => book.name !== bookName)
    }
}

class Book {
    constructor(name, author, pages, status) {
        this.name = name
        this.author = author
        this.pages = pages
        this.status = status
    }

    getName() {
        return this.name
    }

}

const library = Object.assign(
    new Library(),
    JSON.parse(localStorage.getItem("library"))
)

    library.getBooks().map(
        book => Object.assign(
        new Book(), book
    )
)



const hobbit = new Book("The Hobbit", "J.R.R Tolkien", 320, "read")
const silmarillion = new Book("The Silmarillion", "J.R.R. Tolkien", 454, "read")
const babel = new Book("Babel, or the Necessity of Violence", "R.F. Kuang", 560, "read")

library.addBook(hobbit)
library.addBook(silmarillion)
library.addBook(babel)
localStorage.setItem("library", JSON.stringify(library))


// DOM Manipulator

const main = document.querySelector("main")
const shelf = document.querySelector(".shelf")

const addBookBtn = document.getElementById("addBooksBtn")
const bookForm = document.querySelector("form")

addBookBtn.addEventListener("click", () => {
    showElement(bookForm)
})

function showElement(element) {
    element.classList.toggle("show")
}

const nameInput = document.getElementById("bookName")
const authorInput = document.getElementById("authorName")
const pageInput = document.getElementById("pageNumber")
const radioBtns = document.querySelectorAll('input[name="status"]')

const createBookBtn = document.getElementById("createBookBtn")

createBookBtn.addEventListener("click", (e) => {
    if(nameInput.value === "" || authorInput.value === "") {
        return
    } 

    const bookName = nameInput.value
    const authorName = authorInput.value
    const pageNumber = pageInput.value
    let status;

    for (const radioBtn of radioBtns) {
        if (radioBtn.checked) {
            status = radioBtn.value
        } else {
            status = "unread"
        }
    }

    const newBook = new Book(bookName, authorName, pageNumber, status)

    library.addBook(newBook)
    localStorage.setItem("library", JSON.stringify(library))
    populateShelf(shelf)
    showElement(bookForm)
})

function createCard(book) {
    const card = document.createElement("div")
    card.classList.add("card")

    const title = document.createElement("p")
    title.classList.add("title")
    title.textContent = book.name

    const author = document.createElement("p")
    author.textContent = book.author

    card.append(title, author)

    return card
}


function populateShelf(parentElement) {
    parentElement.innerHTML = ""
    if(localStorage.getItem("library") === null) {
        //
    } else { 
        for(let book of library.getBooks()) {
            parentElement.appendChild(createCard(book))
        }
    }
}

populateShelf(shelf)