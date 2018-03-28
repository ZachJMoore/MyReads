import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from "./searchPage.js"
import Bookshelf from "./bookshelf.js"
import { Link } from "react-router-dom"
import { Route } from "react-router-dom"

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
    };

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
    };

  }

  componentDidMount(){
    BooksAPI.getAll().then(res => this.setState({books: res}))
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={()=>{
          return (<div>

            {shelves.map(shelf => <Bookshelf shelf={shelf} key={shelf.id} books={this.state.books} moveBook={this.moveBook}/>)}

            <div className="open-search">
            <Link to="/search">Add a book</Link>
            </div>
          </div>)
          
        }} />
        
        <Route path="/search" render={()=>{
          return (
            <div>
            <SearchPage moveBook={this.moveBook}/>
            </div>
          )
        }} />
      </div>
    )
  }
}

export default BooksApp
