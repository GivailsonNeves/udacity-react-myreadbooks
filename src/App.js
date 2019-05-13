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

  render() {

    const {books} = this.state;

    return (
      <div className="app">
        <Route
          path='/'
          exact
          render={() => (
            <HomePage books={books} />
          )}
        />
        <Route
          path='/search'
          render={() => (
            <SearchPage />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
