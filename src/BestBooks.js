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
      userEmail:''
      
    }
  }
  componentDidMount= async () => {
    try {
    const { user }=this.props.auth0;

    await this.setState({
      userEmail: `${user.email}`})
  
      
          //http://localhost:3005/books?userEmail=malshammari37@gmail.com

        
        let url=`${process.env.REACT_APP_PORT}/books?userEmail=${this.state.userEmail}`;

      let result = await axios.get(url);
      
      await this.setState({
        bookArr: result.data,
        showBooksComponent: true
      });

    } catch (error) {
      console.log(error);
    }}

  render() {
    return(
      
      <Jumbotron>
        <>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>

        <Mycard bookArr={this.state.bookArr} showBooksComponent={this.state.showBooksComponent}/>
        </> 
      </Jumbotron>
    
    
    )
  }
}

export default withAuth0(MyFavoriteBooks);
