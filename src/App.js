import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from "./searchPage.js"
import Bookshelf from "./bookshelf.js"

let shelves = [
  {title: "Currently Reading",
  id: 1,
  shelfId: "currentlyReading"},
  {title: "Want to Read",
  id: 2,
  shelfId: "wantToRead"},
  {title: "Read",
  id: 3,
  shelfId: "read"}
]

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: []
    },
    this.moveBook = (bookToMove, dest) => {
      this.setState(old => {
        return {books: old.books.map(book => {
          if (book.id === bookToMove.id) {
            book.shelf = dest
          }
          return book
        })}
      })
      // books api. Remove item from shelf
      BooksAPI.update(bookToMove, dest)
    }
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then(res => this.setState({books: res}))
  }

  render() {
    return (
      <div className="app">
        {shelves.map(shelf => <Bookshelf shelf={shelf} key={shelf.id} books={this.state.books} moveBook={this.moveBook}/>)}
      </div>
    )
  }
}

export default BooksApp
