import React, { Component } from 'react'

export class Addbook extends Component {
    render() {
        return (
            <form onSubmit={this.props.addBook}>
                <input placeholder='Enter Book name' type="text" name='bookName' />
                <input placeholder='Enter Book Description' type="text" name='bookTitle' />
                <input type="submit" value="Add Book" />
            </form>
        )
    }
}

export default Addbook;