import React from 'react';
import PropTypes from 'prop-types';

const Book = (props) => (
    <li>
        <div className="book">
        <div className="book-top">
            <div className="book-cover" 
            style={{ width: 128, height: 193, 
            backgroundImage: `url("${props.book.imageLinks ? props.book.imageLinks.smallThumbnail : ''}")` }}>
            </div>
            <div className="book-shelf-changer">
            <select 
                value={props.book.shelf} 
                onChange={ event => props.bookChanged(event.target.value, props.book) }>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
            </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        {
            props.book.authors ?  props.book.authors.map(a => (
                <div key={a} className="book-authors">{a}</div>
            )) : <div className="book-authors">unknown</div>
        }
        </div>
    </li>
);

Book.propTypes = {
    book: PropTypes.object.isRequired,
    bookChanged: PropTypes.func.isRequired,
}

export default Book;