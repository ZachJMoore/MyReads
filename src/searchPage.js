
import React from "react"
import { Link } from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import Book from "./book.js"

class searchPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          searchResults: [],
          searchText: ""
        };
        this.getBooks = (event) => {
            this.setState({searchText: event.target.value})
            if (event.target.value.length > 0){
                BooksAPI.search(event.target.value).then(res => {
                    console.log(res);
                    if (res && !res.error) {
                        let filtered = res.map((book) =>{
                            if (!book.imageLinks){
                                console.log(book)
                                book.imageLinks.thumbnail = "http://via.placeholder.com/128x192"
                            }
                            return book
                            
                        })
                        this.setState({searchResults: filtered})
                    }
                })
            } else {
                this.setState({searchResults: []})
            }
            
        }
      }

    render() {
        console.log(this.state.searchText)
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" value={this.state.searchText} onChange={(event) => {
                        this.getBooks(event)
                    }} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchResults.map((book) => <Book book={book} key={book.id} moveBook={this.props.moveBook} />)}
                    </ol>
                </div>
            </div>
        )
    }
}

export default searchPage
