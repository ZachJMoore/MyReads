import React from "react"
import Book from "./book.js"

class bookshelf extends React.Component {
    render() {
        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.shelf.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">

                  {this.props.books.filter(book => book.shelf === this.props.shelf.shelfId)
                  .map(book => <Book book={book} key={book.id} moveBook={this.props.moveBook}/>)}

                </ol>
              </div>
            </div>
        )
    }
}

export default bookshelf
