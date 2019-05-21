import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom'

import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';

class BooksApp extends React.Component {
  
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(
        _books => this.setState({books: _books}),
        e => console.log(e)
      )
  }  

  bookShelfChange(newShelf, book) {
    BooksAPI.update(book, newShelf)
      .then(
        shelfsState => {
          var isNew = true;
          var newBooks = this.state.books.map(
            b => {
              if (b.id == book.id)
                isNew = false;

              if ( shelfsState.currentlyReading.includes(b.id) )
                b.shelf = 'currentlyReading';
              else if ( shelfsState.read.includes(b.id) )
                b.shelf = 'read';
              else if ( shelfsState.wantToRead.includes(b.id) )
                b.shelf = 'wantToRead';
              else
                b.shelf = 'none';

              return b;
            }
          );
          if (isNew) {
            newBooks.push(book);
          }
          this.setState({books: newBooks});
        },
        e => console.log(e)
      )
  }

  render() {

    const {books} = this.state;
    const {booksFinded} = this.state;

    return (
      <div className="app">
        <Route
          path='/'
          exact
          render={() => (
            <HomePage 
              bookShelfChange={this.bookShelfChange.bind(this)} 
              books={books} />
          )}
        />
        <Route
          path='/search'
          render={() => (
            <SearchPage
              booksOnShelfs={books}
              bookShelfChange={this.bookShelfChange.bind(this)}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
