import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import Book from '../components/Book';

class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.handleSearch = debounce(this.handleSearch, 500);
    }

    state = {
        books: []
    }

    handleSearch(searchValue) {
        if (searchValue) {
            BooksAPI.search(searchValue)
                .then(
                    _books => {
                        if (!_books.error) {
                            this.setState({ books: this.markShelfs(_books) })
                        } else {
                            this.setState({ books: [] });
                        }
                    },
                    e => console.log(e)
                );
        } else {
            this.setState({ books: [] });
        }
    }

    markShelfs (booksArray) {
        return booksArray.map (
            b => {

                var book = b;
                book.shelf = 'none';

                this.props.booksOnShelfs.forEach(_b => {
                    if (book.id == _b.id)
                        book = _b;
                });

                return book;
            }
        )
    }

    bookShelfChange(shelf, book) {
        book.shelf = shelf;
        this.props.bookShelfChange(shelf, book);
        const _books = this.state.books.map( b => {

            if (b.id == book.id)
                b.shelf = shelf;

            return b;
        });

        this.setState({books: _books})
    }

    render() {

        const { books } = this.state;
        const { bookShelfChange } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={event => this.handleSearch(event.target.value)} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            books.map(b => (
                                <Book
                                    key={b.id}
                                    bookChanged={this.bookShelfChange.bind(this)}
                                    book={b} />
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

SearchPage.propTypes = {
    bookShelfChange: PropTypes.func.isRequired,
    booksOnShelfs: PropTypes.array.isRequired
}

export default SearchPage;