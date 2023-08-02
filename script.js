const main = document.querySelector("main")
const screen = document.querySelector(".screen")

const addBookBtn = document.getElementById("addBooksBtn")
const bookForm = document.querySelector("form")

addBookBtn.addEventListener("click", showForm)
addBookBtn.addEventListener("click", blur)

function showForm() {
    bookForm.classList.toggle("show")
}

function blur() {
    screen.classList.toggle("blur")
}