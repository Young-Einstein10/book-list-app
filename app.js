// Book Constructor
function Book (title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

// UI Constructor
function UI () {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list')

  // create tr element
  const row = document.createElement('tr')

  // insert cols
  row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">x</a></td>
    `

  list.appendChild(row)

  console.log(row)
}

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}

// Validation
UI.prototype.showAlert = function (msg, className) {
  // Create Div
  const div = document.createElement('div')
  // Add classes
  div.className = `alert ${className}`
  // Add Text
  div.appendChild(document.createTextNode(msg))
  // Get Parent
  const container = document.querySelector('.container')
  const form = document.querySelector('#book-form')

  // Insert alert
  container.insertBefore(div, form)

  // Timeout after 3sec
  setTimeout(() => {
    document.querySelector('.alert').remove()
  }, 3000)
}

// Event Listener for Add Book
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get form values
  const title = document.getElementById('title').value
          const author = document.getElementById('author').value
          const isbn = document.getElementById('isbn').value

  // instantiating book
  const book = new Book(title, author, isbn)

  // instantiate UI
  const ui = new UI()

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please Fill in all fields', 'error')
  } else {
    // Add book to list
    ui.addBookToList(book)

    // Show success
    ui.showAlert('Book Added!', 'success')

    // clear fields
    ui.clearFields()
  }
  e.preventDefault()
})

// Event Listener for Delete
document.getElementById('book-list').addEventListener('click', (e) => {
  // Instantiate UI again bcuz its not in d global scope
  const ui = new UI()

  // Delete Book
  ui.deleteBook(e.target)

  // show message
  ui.showAlert('Book Removed', 'success')

  e.preventDefault()
})
