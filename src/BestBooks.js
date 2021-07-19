import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import Mycard from './components/Mycard';
// import Card from 'react-bootstrap/Card'

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookArr: [],
      showBooksComponent: false,
      userEmail: ''

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
  // localhost:3005/addBook?userEmail=malshammari37@gmail.com&name=book1&description=desc1&status=status1&img=img1
  addNewBook = async (e) => {
    e.preventDefault();
    
    let url = `${process.env.REACT_APP_PORT}/books?userEmail=${this.state.userEmail}`;

    let name = e.target.bookname.value;
    let description = e.target.bookDesc.value;
    let status = e.target.bookStatus.value;
    let img = e.target.bookImg.value;
    let userEmail = this.state.userEmail;

    const bookFormData = {
      name: e.target.catName.value,
      description: e.target.bookDesc.value,
      status:e.target.bookStatus.value,
      img:e.target.bookImg.value,
      //  userEmail=this.state.userEmail
    }
    // let catsData = await axios.get(`${process.env.REACT_APP_PORT}/books?userEmail=${this.state.userEmail}&name=${name}&description=${description}&status=${status}&img=${img}`)

    let booksData = await axios.post(url, bookFormData)

    this.setState({
      bookArr: booksData.data
    })
    console.log('hii',userEmail )
  }

  render() {
    return (

      <Jumbotron>
        <>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>

          <Mycard bookArr={this.state.bookArr} showBooksComponent={this.state.showBooksComponent} addNewBook={this.addNewBook}/>
        </>
      </Jumbotron>


    )
  }
}

export default withAuth0(MyFavoriteBooks);
