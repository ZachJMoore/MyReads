
import React from "react"

class book extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
        this.verifyThumbnail = (book)=>{
            if (!book.imageLinks) {
                let newBook = book
                newBook.imageLinks = {
                    thumbnail: "http://via.placeholder.com/128x192"
                }
                return newBook.imageLinks.thumbnail
            } else {
                return book.imageLinks.thumbnail
            }
        }
      };

    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${this.verifyThumbnail(this.props.book)})` }}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={this.props.book.shelf} onChange={(event) => {
                            this.props.moveBook(this.props.book, event.target.value);
                        }}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.authors}</div>
                </div>
            </li>
        )
    }
}

export default book
