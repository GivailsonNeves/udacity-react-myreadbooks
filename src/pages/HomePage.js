import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BookShelf from '../components/BookShelf';
import PropTypes from 'prop-types';

class HomePage extends Component {

    render() {
        const {books} = this.props;
        const {bookShelfChange} = this.props;

        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                {
                    (books && books.length) ?
                    <div>
                        <BookShelf
                            bookChanged={bookShelfChange}
                            title='Currently Reading' 
                            books={books.filter(b => b.shelf == 'currentlyReading')}/>
                        <BookShelf 
                            bookChanged={bookShelfChange}
                            title='Want to Read' 
                            books={books.filter(b => b.shelf == 'wantToRead')}/>
                        <BookShelf 
                            bookChanged={bookShelfChange}
                            title='Read' 
                            books={books.filter(b => b.shelf == 'read')}/>>
                    </div>
                    :
                    <div>
                        <p className="text-center">Não foram encontrados livros</p>
                    </div>
                }
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    books: PropTypes.array.isRequired,
    bookShelfChange: PropTypes.func.isRequired,
}

export default HomePage;