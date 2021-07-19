import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export class BookFormModal extends Component {
    render() {
        return (
            <>

                <Modal show={this.props.showModal2}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <form onSubmit={this.props.updateBook}>
                            <input placeholder='Enter Book name' type="text" name='bookname' defaultValue={this.props.name}/>
                            <input placeholder='Enter Book Description' type="text" name='bookDesc' defaultValue={this.props.description} />
                            <input placeholder='Enter Book Status' type="text" name='bookStatus' defaultValue={this.props.status} />
                            <input placeholder='Enter Book Img' type="text" name='bookImg' defaultValue={this.props.img}/>
                            <input type="submit" value="Update Book" />
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