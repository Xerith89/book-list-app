//Class will be used to create an instance of a book that will be inserted into the list
class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//Controls the Displaying and adding of books via the HTML form UI
class UI {
    static displayBooks(){
        //Test Data
        const storedBooks = [
            {
                title: 'Book One',
                author: 'Author One',
                isbn: '12345'
            },
            {
                title: 'Book Two',
                author: 'Author Two',
                isbn: '45678'
            }
        ];

        const books = storedBooks;

        books.forEach((book) => UI.addBook(book));
    }

    static addBook(book){
        const bookList = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = 
        `<td class="text-center">${book.title}</td>
        <td class="text-center">${book.author}</td>
        <td class="text-center">${book.isbn}</td>
        <td class="text-center"><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        bookList.appendChild(row);
    }

    static resetForm(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el){
        if (el.classList.contains('delete'))
        {
            el.parentElement.parentElement.remove();
            UI.showMessage('Book Removed','success')
        }
    }

    static showMessage(output,alert_type)
    {
        const success_div = document.querySelector('#status-msg');
        const message = document.createElement('div');
        message.innerHTML = `<label class="alert alert-${alert_type} text-center btn-block mt-4" role="alert">${output}</label>`;
        success_div.appendChild(message);
        setTimeout(() => {
            success_div.removeChild(message);
        },1500);
    }
}

//Event Listeners
document.addEventListener('DOMContentLoaded', UI.displayBooks());

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    //Form validation - everything can be a string but we want to make sure isbn is a number otherwise print an error
    if (!isNaN(document.querySelector('#isbn').value))
    {
        //Show a success message when a book is added.
        const book = new Book(document.querySelector('#title').value,document.querySelector('#author').value,document.querySelector('#isbn').value);
        UI.addBook(book);
        UI.showMessage('Book Added Successfully!','success');
        UI.resetForm();
    }
    else {
        //Add in an error message to a div - display it for 2 seconds then clear and remove what is in ISBN field
        UI.showMessage('ISBN Must Be A Number!','danger');
        document.querySelector('#isbn').value = '';
    }
});

document.querySelector('#book-list').addEventListener('click', (e) => {
   UI.deleteBook(e.target);
});