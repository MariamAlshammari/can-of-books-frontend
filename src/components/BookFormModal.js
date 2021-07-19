import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export class BookFormModal extends Component {
    render() {
        return (
            <>

                <Modal show={this.props.showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <form onSubmit={this.props.addNewBook}>
                            <input placeholder='Enter Book name' type="text" name='bookname' />
                            <input placeholder='Enter Book Description' type="text" name='bookDesc' />
                            <input placeholder='Enter Book Status' type="text" name='bookStatus' />
                            <input placeholder='Enter Book Img' type="text" name='bookImg' />
                            <input type="submit" value="Add Book" />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>






            </>
        )
    }
}

export default BookFormModal;