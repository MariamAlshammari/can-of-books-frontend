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
import UpdateBookForm from './components/UpdateBookForm';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookArr: [],
      showBooksComponent: false,
      userEmail: '',
      showModal:false,
      showModal2:false,
      showUpdateForm: false,
      idx: 0,
      name: '',
      description: '',
      status:'',
      img:''

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
  showFormModal2=()=>{
    this.setState({
      showModal2:true
    
  })}

  handleClose=()=>{
    this.setState({
      showModal:false,
      showModal2:false
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

  showUpdateBookForm=async(idx)=>{
    console.log('update',idx);
    await this.setState({
      showUpdateForm: true,
      idx: idx,
      showModal2:true,
    
      name: this.state.bookArr[idx].name,
      description: this.state.bookArr[idx].description,
      status: this.state.bookArr[idx].status,
      img: this.state.bookArr[idx].img
      
    })

    console.log('hhh',this.state.description)
  }

  updateBook=async(e)=>{
    e.preventDefault();
    let bookFormData={
      name: e.target.bookname.value,
      description: e.target.bookDesc.value,
      status: e.target.bookStatus.value,
      img: e.target.bookImg.value,
      userEmail:this.state.userEmail
    }
    let booksData=await axios.put(`${process.env.REACT_APP_PORT}/updateBook/${this.state.idx}`,bookFormData)

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

          <Mycard bookArr={this.state.bookArr} showBooksComponent={this.state.showBooksComponent} deleteBook={this.deleteBook} showUpdateBookForm={this.showUpdateBookForm}/>

          <button onClick={this.showFormModal}>Add Book</button>


          <BookFormModal  showModal={this.state.showModal}  handleClose={this.handleClose}showFormModal={this.showFormModal}addNewBook={this.addNewBook} />
          
          {this.state.showUpdateForm &&
          <UpdateBookForm
            name={this.state.name}
            description={this.state.description}
            status={this.state.status}
            img={this.state.img}
            updateBook = {this.updateBook}
            showModal2={this.state.showModal2} handleClose={this.handleClose}showFormModal2={this.showFormModal2}
            
            
          />}
        </>
      </Jumbotron>


    )
  }
}

export default withAuth0(MyFavoriteBooks);
