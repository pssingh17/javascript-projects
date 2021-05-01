// Navbar
let menuIcon = document.getElementById("menu-icon");
let closeBtn = document.getElementById("closeBtn");
let navlist = document.getElementById('nav-list');
menuIcon.addEventListener('click',()=>{
    navlist.classList.add('show');
})
closeBtn.addEventListener('click',()=>{
    navlist.classList.remove('show');
});
// DISPLAY ON REFRESHING THE BROWSER
let books = localStorage.getItem("book");
console.log(books);
if(books == null){
    bookObj = [];
}
else{
    bookObj = JSON.parse(books);
}
bookObj.forEach((element,index)=>{
    if (element.name.length < 2 || element.author.length < 2) {
        return false
    }
    else {
        
        let i=1;
        let uiString = `<tr>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        <td><button type="submit" class="btn btn-danger" id="${index}" onClick="deleteBook(this.id)" >Delete</button></td>
        </tr>`
        tableBody.innerHTML += uiString;
        i++;
    }
})


// Library form

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit',submitForm);
function submitForm(e){
    e.preventDefault();
    // console.log("submitted");
    let type;
    
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let programming = document.getElementById("programming");
    let scifi = document.getElementById("scifi");
    let nutrition = document.getElementById("nutrition");
    if(programming.checked){
        type = programming.value;
    }
    else if(scifi.checked){
        type=scifi.value;
    }
    else if(nutrition.checked){
        type = nutrition.value;
    }
    let book = new Book(name,author,type);
    console.log(book);
    
    bookObj.push(book);
    localStorage.setItem('book',JSON.stringify(bookObj));
    let display = new Display();
    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}
    


function Display(){

}
Display.prototype.add = function(book){
    // console.log("adding to ui");
    tableBody = document.getElementById("tableBody");
    let i=1;
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                        <td><button id="${i}" type="submit" onClick="deleteBook(this.id)" class="btn btn-danger">Delete</button></td>
                    </tr>`
                    tableBody.innerHTML += uiString;
                    i++;
                    }
Display.prototype.clear = function(){
    let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();

}

// Implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false
    }
    else {
        return true;
    }
}
Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Messge:</strong> ${displayMessage}
                            
                            <span aria-hidden="true"></span>
                            </button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = ''
    }, 2000);

}
function deleteBook(id){
    let book = localStorage.getItem("book");

    if(book == null){
        bookObj = [];
    }
    else{
        bookObj = JSON.parse(book);
    }
    bookObj.splice(id,1);
    localStorage.setItem("book",JSON.stringify(bookObj));
    window.location.reload(); 
    
}
