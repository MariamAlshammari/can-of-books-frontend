import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import Mycard from './components/Mycard';
// import Card from 'react-bootstrap/Card'
import BookFormModal from './components/BookFormModal';
import { findAllByDisplayValue } from '@testing-library/react';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookArr: [],
      showBooksComponent: false,
      userEmail: '',
      showModal:false

    }
  }
  componentDidMount = async () => {
    try {
      const { user } = this.props.auth0;

      await this.setState({
        userEmail: `${user.email}`
      })


      //http://localhost:3005/books?userEmail=malshammari37@gmail.com


      let url = `${process.env.REACT_APP_PORT}/books?userEmail=${this.state.userEmail}`;

      let result = await axios.get(url);

      await this.setState({
        bookArr: result.data,
        showBooksComponent: true
      });

    } catch (error) {
      console.log(error);
    }
  }


  showFormModal=()=>{
    this.setState({
      showModal:true
    
  })
  console.log('hi');
  }

  handleClose=()=>{
    this.setState({
      showModal:false
    })
  }
  
  // localhost:3005/addBook?userEmail=malshammari37@gmail.com&name=book1&description=desc1&status=status1&img=img1
  addNewBook = async (e) => {
    e.preventDefault();
try{
    // let url = `${process.env.REACT_APP_PORT}/addBook?userEmail=${this.state.userEmail}`;

    let name = e.target.bookname.value;
    let description = e.target.bookDesc.value;
    let status = e.target.bookStatus.value;
    let img = e.target.bookImg.value;
    let Email = this.state.userEmail;

    const bookFormData = {
      name: e.target.bookname.value,
      description: e.target.bookDesc.value,
      status: e.target.bookStatus.value,
      img: e.target.bookImg.value,
      Email: this.state.userEmail
    }
    // let booksData = await axios.get(`${process.env.REACT_APP_PORT}/books?userEmail=${this.state.userEmail}&name=${name}&description=${description}&status=${status}&img=${img}`)

    let booksData = await axios.post(`${process.env.REACT_APP_PORT}/addBook`, bookFormData)

    // let booksData = await axios.post(url, bookFormData)

    await this.setState({
      bookArr: booksData.data
    })
    console.log('hii', Email)
  }

  
  catch (error) {
    console.log(error);
  }
  }

  deleteBook=async(idx)=>{
    console.log('deleeete',idx);
    let paramsObj={
      userEmail:this.state.userEmail
    }
    let booksData=await axios.delete(`${process.env.REACT_APP_PORT}/books/${idx}`,{params:paramsObj})

    this.setState({
      bookArr: booksData.data
    })

  }
  render() {
    return (

      <Jumbotron>
        <>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>

          <Mycard bookArr={this.state.bookArr} showBooksComponent={this.state.showBooksComponent} deleteBook={this.deleteBook}/>

          <button onClick={this.showFormModal}>Add Book</button>


          <BookFormModal  showModal={this.state.showModal} addNewBook={this.addNewBook} handleClose={this.handleClose}showFormModal={this.showFormModal} />
        </>
      </Jumbotron>


    )
  }
}

export default withAuth0(MyFavoriteBooks);
