console.log("This is project library.");

// Todos"
// 1. Store all the data to the localStorage [will do it in this weekned]
// 2. Give another column as an option to delete the book
// 3. Add a scroll bar to the view


/* Using Prototype */

//Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display Constructor
function Display() {

}

//Add methods to Display() prototype, This method will add data entry
Display.prototype.add = function (book) {
    console.log("Adding");
    let tableBody = document.getElementById("tableBody");
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tableBody.innerHTML += uiString; //to add row
}

//Implementing clear function to clear textbox after successful operation
Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

//Implementing validate function to validate user from doing corrupt entry
Display.prototype.validate = function (book) {
    if (book.name.length <= 2 || book.author.length <= 2) {
        return false;
    }
    else {
        return true;
    }
}

//Implementing show function to display alert message on the insertion
Display.prototype.show = function (type, showMessage) {
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Attention:</strong> ${showMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;

    //Timeout function for specific time interval
    setTimeout(function () {
        message.innerHTML = "";
    }, 2000);
}

//Add submit event listner to the libraryForm 
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("submit");

    let type;
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    //to validate user from entering data
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success", "Bingo! Your data has been successfully added.");
    }
    else {
        //show error to user
        display.show("danger", "Sorry! You cannot add this data.");
    }
    e.preventDefault(); // to show the logs even after page relaod
}