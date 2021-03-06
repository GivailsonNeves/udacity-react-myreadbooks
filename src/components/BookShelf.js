import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
    render() {

        const {books} = this.props;
        const {bookChanged} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map( b => (
                                <Book 
                                    key={b.id}
                                    bookChanged={bookChanged} 
                                    book={b} />
                            ))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    bookChanged: PropTypes.func.isRequired,
}

export default BookShelf;